import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/* ============================================================
   1. ДАННЫЕ (физические параметры — JPL, текстуры - локальные)
   ============================================================ */
const JPL_PHYS = 'NASA/JPL Planetary Physical Parameters: https://ssd.jpl.nasa.gov/planets/phys_par.html';
const JPL_FACT = 'NASA Planetary Fact Sheet: https://nssdc.gsfc.nasa.gov/planetary/factsheet/';
const SSS = 'Solar System Scope (CC BY 4.0)';
const CELESTIA = 'Celestia Motherlode (CC0)';
const FARGETANIK = 'FarGetaNik (CC BY-SA 4.0)';
const ASKANIY = 'Askaniy (CC BY 3.0)';

const TEX = {
  mercury: 'textures/2k_mercury.jpg',
  venus: 'textures/2k_venus_surface.jpg',
  earthDay: 'textures/2k_earth_daymap.jpg',
  earthNight: 'textures/2k_earth_nightmap.jpg',
  earthClouds: 'textures/2k_earth_clouds.jpg',
  moon: 'textures/2k_moon.jpg',
  mars: 'textures/2k_mars.jpg',
  jupiter: 'textures/2k_jupiter.jpg',
  saturn: 'textures/2k_saturn.jpg',
  saturnRing: 'textures/2k_saturn_ring_alpha.png',
  uranus: 'textures/2k_uranus.jpg',
  neptune: 'textures/2k_neptune.jpg',

  dione: 'textures/dione.jpg',
  enceladus: 'textures/Enceladus.jpg',
  iapetus: 'textures/Iapetus.jpg',
  mimas: 'textures/Mimas.jpg',
  rhea: 'textures/Rhea.jpg',
  tethys: 'textures/Tethys.jpg',
  titan: 'textures/2k_titan.jpg',
  
  miranda: 'textures/MirandaColour.png',
  mirandaBump: 'textures/MirandaBump.png',
  ariel: 'textures/ArielColour.Png',
  arielBump: 'textures/ArielBump.Png',
  umbriel: 'textures/UmbirelColour.png',
  umbrielBump: 'textures/UmbirelBump.png',
  titania: 'textures/TitaniaColour.png',
  titaniaBump: 'textures/TitaniaBump.png',
  oberon: 'textures/OberonColour.png',
  oberonBump: 'textures/OberonBump.png',
  
  triton: 'textures/Triton.jpg',
  
  phobos: 'textures/hires/phobos_albedo.jpg',
  phobosNormal: 'textures/extra_material_for_play/phobos_normal.jpg',
  deimos: 'textures/hires/deimos_albedo.jpg',
  deimosNormal: 'textures/extra_material_for_play/deimos_normal.jpg',

  io: 'textures/Io.jpeg',
  europa: 'textures/Europa.jpg',
  ganymede: 'textures/Ganymede.jpeg',
  callisto: 'textures/Callisto.jpg',
  amalthea: 'textures/Amathea.jpg',
  himalia: 'textures/Himalia.jpg',
  thebe: 'textures/Thebe.jpg',
  elara: 'textures/Elara.jpg',
  pasiphae: 'textures/Pasiphae.jpg'
};

const PLANETS = [
  {
    id: 'mercury', name: 'Меркурий', englishName: 'Mercury', type: 'terrestrial',
    description: 'Самая близкая к Солнцу и самая маленькая планета. Практически лишена атмосферы, поверхность покрыта кратерами.',
    physical: { meanRadiusKm: 2439.7, massKg: 3.3011e23, densityGcm3: 5.427, gravityMs2: 3.7 },
    rotation: { periodDays: 58.646, direction: 'prograde', axialTiltDeg: 0.034 },
    orbit: { semiMajorAxisAu: 0.387098, eccentricity: 0.20563, inclinationDeg: 7.005, orbitalPeriodDays: 87.969, longitudeAscendingNodeDeg: 48.331, argumentPeriapsisDeg: 29.124, meanAnomalyAtEpochDeg: 174.796 },
    textures: { albedo: TEX.mercury },
    visual: { atmosphereEnabled: false, color: '#9a8f86' },
    satelliteIds: [],
    facts: ['Сутки на Меркурии длятся 176 земных суток.', 'Температура колеблется от −180 °C до +430 °C.', 'Один оборот вокруг Солнца — 88 земных суток.'],
    dataSources: [JPL_PHYS, JPL_FACT, SSS]
  },
  {
    id: 'venus', name: 'Венера', englishName: 'Venus', type: 'terrestrial',
    description: 'Планета с плотной углекислотной атмосферой и облаками серной кислоты. Вращается ретроградно.',
    physical: { meanRadiusKm: 6051.8, massKg: 4.8675e24, densityGcm3: 5.243, gravityMs2: 8.87 },
    rotation: { periodDays: 243.018, direction: 'retrograde', axialTiltDeg: 177.4 },
    orbit: { semiMajorAxisAu: 0.723332, eccentricity: 0.006772, inclinationDeg: 3.39458, orbitalPeriodDays: 224.701, longitudeAscendingNodeDeg: 76.68, argumentPeriapsisDeg: 54.884, meanAnomalyAtEpochDeg: 50.115 },
    textures: { albedo: TEX.venus },
    visual: { atmosphereEnabled: true, color: '#e8c98a' },
    satelliteIds: [],
    facts: ['Один оборот вокруг оси — 243 земных суток.', 'Самый горячий мир Солнечной системы: около +465 °C.', 'Давление у поверхности в 92 раза выше земного.'],
    dataSources: [JPL_PHYS, JPL_FACT, SSS]
  },
  {
    id: 'earth', name: 'Земля', englishName: 'Earth', type: 'terrestrial',
    description: 'Наш дом. Единственная известная планета с жидкой водой на поверхности и жизнью.',
    physical: { meanRadiusKm: 6371.0, massKg: 5.97237e24, densityGcm3: 5.514, gravityMs2: 9.80665 },
    rotation: { periodDays: 0.99727, direction: 'prograde', axialTiltDeg: 23.44 },
    orbit: { semiMajorAxisAu: 1.0, eccentricity: 0.0167086, inclinationDeg: 0.00005, orbitalPeriodDays: 365.256, longitudeAscendingNodeDeg: -11.26064, argumentPeriapsisDeg: 114.20783, meanAnomalyAtEpochDeg: 358.617 },
    textures: { albedo: TEX.earthDay, nightLights: TEX.earthNight, clouds: TEX.earthClouds },
    visual: { atmosphereEnabled: true, color: '#5b9dff' },
    satelliteIds: ['moon'],
    facts: ['Наклон оси 23,44° определяет смену времён года.', '71 % поверхности покрыто водой.', 'Атмосфера на 78 % состоит из азота.'],
    dataSources: [JPL_PHYS, JPL_FACT, SSS]
  },
  {
    id: 'mars', name: 'Марс', englishName: 'Mars', type: 'terrestrial',
    description: 'Холодная пустынная планета с тонкой атмосферой, полярными шапками и следами древней воды.',
    physical: { meanRadiusKm: 3389.5, massKg: 6.4171e23, densityGcm3: 3.9335, gravityMs2: 3.72076 },
    rotation: { periodDays: 1.02596, direction: 'prograde', axialTiltDeg: 25.19 },
    orbit: { semiMajorAxisAu: 1.523679, eccentricity: 0.0934, inclinationDeg: 1.85, orbitalPeriodDays: 686.98, longitudeAscendingNodeDeg: 49.558, argumentPeriapsisDeg: 286.502, meanAnomalyAtEpochDeg: 19.373 },
    textures: { albedo: TEX.mars },
    visual: { atmosphereEnabled: true, color: '#c47a52' },
    satelliteIds: ['phobos', 'deimos'],
    facts: ['Олимп — самый высокий вулкан Солнечной системы (≈ 21 км).', 'Год длится 687 земных суток.', 'Два крошечных спутника: Фобос и Деймос.'],
    dataSources: [JPL_PHYS, JPL_FACT, SSS]
  },
  {
    id: 'jupiter', name: 'Юпитер', englishName: 'Jupiter', type: 'gas_giant',
    description: 'Крупнейшая планета Солнечной системы. Полосы облаков, Большое красное пятно и мощная магнитосфера.',
    physical: { meanRadiusKm: 69911, massKg: 1.8982e27, densityGcm3: 1.326, gravityMs2: 24.79 },
    rotation: { periodDays: 0.41354, direction: 'prograde', axialTiltDeg: 3.13 },
    orbit: { semiMajorAxisAu: 5.2044, eccentricity: 0.0489, inclinationDeg: 1.303, orbitalPeriodDays: 4332.59, longitudeAscendingNodeDeg: 100.464, argumentPeriapsisDeg: 273.867, meanAnomalyAtEpochDeg: 20.02 },
    textures: { albedo: TEX.jupiter },
    visual: { atmosphereEnabled: true, color: '#d8b48a' },
    satelliteIds: ['io', 'europa', 'ganymede', 'callisto', 'amalthea', 'himalia', 'thebe', 'elara', 'pasiphae'],
    facts: ['Масса Юпитера в 318 раз больше земной.', 'Большое красное пятно — гигантский антициклон.', 'Четыре крупнейших спутника открыл Галилей в 1610 году.'],
    dataSources: [JPL_PHYS, JPL_FACT, SSS]
  },
  {
    id: 'saturn', name: 'Сатурн', englishName: 'Saturn', type: 'gas_giant',
    description: 'Газовый гигант с самой яркой системой колец. Плотность меньше плотности воды.',
    physical: { meanRadiusKm: 58232, massKg: 5.6834e26, densityGcm3: 0.687, gravityMs2: 10.44 },
    rotation: { periodDays: 0.44401, direction: 'prograde', axialTiltDeg: 26.73 },
    orbit: { semiMajorAxisAu: 9.5826, eccentricity: 0.0565, inclinationDeg: 2.485, orbitalPeriodDays: 10759.22, longitudeAscendingNodeDeg: 113.665, argumentPeriapsisDeg: 339.392, meanAnomalyAtEpochDeg: 317.02 },
    textures: { albedo: TEX.saturn, ring: TEX.saturnRing },
    visual: { atmosphereEnabled: true, color: '#e8d6a8' },
    satelliteIds: ['mimas', 'enceladus', 'tethys', 'dione', 'rhea', 'titan', 'iapetus'],
    facts: ['Кольца состоят из льда и пыли.', 'Титан — единственный спутник с плотной атмосферой.', 'Средняя плотность Сатурна меньше плотности воды.'],
    dataSources: [JPL_PHYS, JPL_FACT, SSS]
  },
  {
    id: 'uranus', name: 'Уран', englishName: 'Uranus', type: 'ice_giant',
    description: 'Ледяной гигант, «лежащий на боку»: ось наклонена почти на 98°.',
    physical: { meanRadiusKm: 25362, massKg: 8.681e25, densityGcm3: 1.271, gravityMs2: 8.69 },
    rotation: { periodDays: 0.71833, direction: 'retrograde', axialTiltDeg: 97.77 },
    orbit: { semiMajorAxisAu: 19.2184, eccentricity: 0.046381, inclinationDeg: 0.773, orbitalPeriodDays: 30688.5, longitudeAscendingNodeDeg: 74.006, argumentPeriapsisDeg: 96.998, meanAnomalyAtEpochDeg: 142.238 },
    textures: { albedo: TEX.uranus },
    visual: { atmosphereEnabled: true, color: '#9fe0e8' },
    satelliteIds: ['miranda', 'ariel', 'umbriel', 'titania', 'oberon'],
    facts: ['Ось вращения наклонена на 97,77°.', 'Сутки длятся около 17 часов.', 'Открыт Уильямом Гершелем в 1781 году.'],
    dataSources: [JPL_PHYS, JPL_FACT, SSS]
  },
  {
    id: 'neptune', name: 'Нептун', englishName: 'Neptune', type: 'ice_giant',
    description: 'Самая далёкая планета. Синие облака, сильные ветры и ретроградный Тритон.',
    physical: { meanRadiusKm: 24622, massKg: 1.02413e26, densityGcm3: 1.638, gravityMs2: 11.15 },
    rotation: { periodDays: 0.67125, direction: 'prograde', axialTiltDeg: 28.32 },
    orbit: { semiMajorAxisAu: 30.11, eccentricity: 0.009456, inclinationDeg: 1.77, orbitalPeriodDays: 60195, longitudeAscendingNodeDeg: 131.784, argumentPeriapsisDeg: 276.336, meanAnomalyAtEpochDeg: 259.883 },
    textures: { albedo: TEX.neptune },
    visual: { atmosphereEnabled: true, color: '#4f7fe0' },
    satelliteIds: ['triton'],
    facts: ['Ветры достигают 2100 км/ч.', 'Тритон движется по ретроградной орбите.', 'Открыт в 1846 году по расчётам Леверье.'],
    dataSources: [JPL_PHYS, JPL_FACT, SSS]
  }
];

function mkSat(id, name, parent, radiusKm, massKg, density, periodDays, dir, aKm, e, iDeg, color, facts, texObj, sources) {
  return {
    id, name, parentPlanetId: parent,
    description: name + ' — спутник планеты ' + parent + '.',
    physical: { meanRadiusKm: radiusKm, massKg, densityGcm3: density },
    rotation: { periodDays, direction: dir, synchronous: true },
    orbit: { semiMajorAxisKm: aKm, eccentricity: e, inclinationDeg: iDeg, orbitalPeriodDays: periodDays, direction: dir, meanAnomalyAtEpochDeg: (id.charCodeAt(0) * 37) % 360 },
    textures: texObj,
    visual: { color }, facts,
    dataSources: sources || [JPL_PHYS, CELESTIA]
  };
}

const SATELLITES = [
  mkSat('moon','Луна','earth',1737.4,7.342e22,3.344,27.3217,'prograde',384399,0.0549,5.145,'#c8c4bc',['Единственный естественный спутник Земли.','Всегда обращена к Земле одной стороной.','Вызывает приливы и отливы.'], { albedo: TEX.moon }, [JPL_PHYS, SSS]),
  
  mkSat('phobos','Фобос','mars',11.267,1.0659e16,1.876,0.31891,'prograde',9376,0.0151,1.093,'#8f8378',['Приближается к Марсу и через ~50 млн лет разрушится.','Один из двух спутников Марса.'], { albedo: TEX.phobos, normal: TEX.phobosNormal }, [JPL_PHYS, CELESTIA]),
  mkSat('deimos','Деймос','mars',6.2,1.4762e15,1.471,1.263,'prograde',23463,0.00033,0.93,'#a09384',['Меньший из двух спутников Марса.','Поверхность покрыта реголитом.'], { albedo: TEX.deimos, normal: TEX.deimosNormal }, [JPL_PHYS, CELESTIA]),
  
  mkSat('io','Ио','jupiter',1821.6,8.9319e22,3.528,1.769,'prograde',421700,0.0041,0.05,'#e8d46a',['Самый вулканически активный объект Солнечной системы.','Более 400 действующих вулканов.'], { albedo: TEX.io }, [JPL_PHYS]),
  mkSat('europa','Европа','jupiter',1560.8,4.7998e22,3.013,3.551,'prograde',671034,0.009,0.47,'#e8e0d0',['Под ледяной корой — солёный океан.','Один из главных кандидатов на поиск жизни.'], { albedo: TEX.europa }, [JPL_PHYS]),
  mkSat('ganymede','Ганимед','jupiter',2634.1,1.4819e23,1.942,7.155,'prograde',1070412,0.0013,0.2,'#a89880',['Крупнейший спутник в Солнечной системе.','Обладает собственным магнитным полем.'], { albedo: TEX.ganymede }, [JPL_PHYS]),
  mkSat('callisto','Каллисто','jupiter',2410.3,1.0759e23,1.834,16.689,'prograde',1882709,0.0074,0.192,'#6e665e',['Одна из самых кратерированных поверхностей.','Считается геологически неактивной.'], { albedo: TEX.callisto }, [JPL_PHYS]),
  mkSat('amalthea','Амальтея','jupiter',83.5,2.08e18,0.849,0.498,'prograde',181365,0.0032,0.374,'#a06050',['Красноватая поверхность.','Внутренний спутник Юпитера.'], { albedo: TEX.amalthea }, [JPL_PHYS]),
  mkSat('himalia','Гималия','jupiter',85,4.2e18,2.6,250.56,'prograde',11460000,0.16,27.5,'#908070',['Крупнейший из нерегулярных спутников Юпитера.','Группа Гималии.'], { albedo: TEX.himalia }, [JPL_PHYS]),
  mkSat('thebe','Фива','jupiter',49.3,1.5e18,3.0,0.674,'prograde',221889,0.0175,1.076,'#806050',['Второй по величине внутренний спутник.','Красноватый оттенок.'], { albedo: TEX.thebe }, [JPL_PHYS]),
  mkSat('elara','Элара','jupiter',43,8.7e17,2.6,259.64,'prograde',11741000,0.22,26.6,'#908080',['Открыт в 1905 году.','Относится к группе Гималии.'], { albedo: TEX.elara }, [JPL_PHYS]),
  mkSat('pasiphae','Пасифая','jupiter',30,3.0e17,2.9,743.6,'retrograde',23624000,0.41,151.4,'#605040',['Движется по ретроградной орбите.','Группа Пасифаи.'], { albedo: TEX.pasiphae }, [JPL_PHYS]),
  
  mkSat('mimas','Мимас','saturn',198.2,3.75e19,1.15,0.942,'prograde',185539,0.0196,1.574,'#b8b0a8',['Кратер Гершель занимает треть диаметра.','Известен как «Звезда Смерти».'], { albedo: TEX.mimas }, [JPL_PHYS, CELESTIA]),
  mkSat('enceladus','Энцелад','saturn',252.1,1.08e20,1.61,1.37,'prograde',237948,0.0047,0.009,'#e8f4ff',['Гейзеры воды на южном полюсе.','Источник кольца E Сатурна.'], { albedo: TEX.enceladus }, [JPL_PHYS, CELESTIA]),
  mkSat('tethys','Тефия','saturn',531.1,6.17e20,0.98,1.888,'prograde',294619,0.0001,1.12,'#d8d2c8',['Почти чистая ледяная поверхность.','Огромный кратер Одиссей.'], { albedo: TEX.tethys }, [JPL_PHYS, CELESTIA]),
  mkSat('dione','Диона','saturn',561.4,1.095e21,1.478,2.737,'prograde',377396,0.0022,0.019,'#c8c2b8',['Имеет тонкую атмосферу из кислорода.','Поверхность покрыта яркими полосами.'], { albedo: TEX.dione }, [JPL_PHYS, CELESTIA]),
  mkSat('rhea','Рея','saturn',763.8,2.306e21,1.236,4.518,'prograde',527108,0.001,0.345,'#d0cabf',['Второй по величине спутник Сатурна.','Состоит преимущественно из водяного льда.'], { albedo: TEX.rhea }, [JPL_PHYS, CELESTIA]),
  mkSat('titan','Титан','saturn',2574.7,1.3452e23,1.882,15.945,'prograde',1221870,0.0288,0.349,'#d8a86a',['Единственный спутник с плотной атмосферой.','Метановые озёра и реки на поверхности.'], { albedo: TEX.titan }, [JPL_PHYS, SSS, FARGETANIK]),
  mkSat('iapetus','Япет','saturn',734.5,1.806e21,1.088,79.32,'prograde',3560820,0.0286,15.47,'#9a8a78',['Двухцветная поверхность: светлая и тёмная.','Сильно наклонённая орбита.'], { albedo: TEX.iapetus }, [JPL_PHYS, CELESTIA]),
  
  mkSat('miranda','Миранда','uranus',235.8,6.59e19,1.2,1.413,'prograde',129390,0.0013,4.232,'#b8b4ac',['Хаотичный рельеф с огромными уступами.','Открыта в 1948 году.'], { albedo: TEX.miranda, bump: TEX.mirandaBump }, [JPL_PHYS, FARGETANIK]),
  mkSat('ariel','Ариэль','uranus',578.9,1.353e21,1.592,2.52,'prograde',191020,0.0012,0.26,'#c8c4bc',['Самая яркая поверхность среди спутников Урана.','Молодые геологические структуры.'], { albedo: TEX.ariel, bump: TEX.arielBump }, [JPL_PHYS, FARGETANIK]),
  mkSat('umbriel','Умбриэль','uranus',584.7,1.172e21,1.459,4.144,'prograde',266000,0.0039,0.128,'#7a736c',['Самая тёмная поверхность среди спутников Урана.','Кратер Вунда — яркое пятно.'], { albedo: TEX.umbriel, bump: TEX.umbrielBump }, [JPL_PHYS, FARGETANIK]),
  mkSat('titania','Титания','uranus',788.9,3.527e21,1.711,8.706,'prograde',435910,0.0011,0.34,'#b0a89e',['Крупнейший спутник Урана.','Разломы и каньоны на поверхности.'], { albedo: TEX.titania, bump: TEX.titaniaBump }, [JPL_PHYS, FARGETANIK]),
  mkSat('oberon','Оберон','uranus',761.4,3.014e21,1.63,13.463,'prograde',583520,0.0014,0.058,'#8a7c72',['Самый далёкий крупный спутник Урана.','Древняя кратерированная поверхность.'], { albedo: TEX.oberon, bump: TEX.oberonBump }, [JPL_PHYS, FARGETANIK]),
  
  mkSat('triton','Тритон','neptune',1353.4,2.139e22,2.061,5.877,'retrograde',354759,0.000016,156.885,'#e0c8d0',['Движется по ретроградной орбите.','Азотные гейзеры и тонкая атмосфера.'], { albedo: TEX.triton }, [JPL_PHYS, ASKANIY])
];

const PLANET_BY_ID = Object.fromEntries(PLANETS.map(p => [p.id, p]));
const SATELLITE_BY_ID = Object.fromEntries(SATELLITES.map(s => [s.id, s]));
const SATS_BY_PLANET = {};
for (const s of SATELLITES) (SATS_BY_PLANET[s.parentPlanetId] ||= []).push(s);

/* ============================================================
   2. УТИЛИТЫ
   ============================================================ */
const d2r = d => d * Math.PI / 180;
const fmtNumber = (n, d=0) => isFinite(n) ? n.toLocaleString('ru-RU', { maximumFractionDigits: d }) : '—';
const fmtScientific = (n, d=3) => {
  if (n === 0) return '0';
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const mant = n / Math.pow(10, exp);
  return `${mant.toFixed(d)} × 10^${exp}`;
};
const fmtDays = (d) => {
  if (!isFinite(d)) return '—';
  if (Math.abs(d) < 1) return `${(d * 24).toFixed(2)} ч`;
  return `${d.toLocaleString('ru-RU', { maximumFractionDigits: 3 })} сут`;
};

function norm2pi(a) { a = a % (2 * Math.PI); return a < 0 ? a + 2 * Math.PI : a; }
function solveKepler(M, e) {
  M = norm2pi(M);
  let E = e < 0.8 ? M : Math.PI;
  for (let k = 0; k < 12; k++) {
    const f = E - e * Math.sin(E) - M;
    const fp = 1 - e * Math.cos(E);
    const d = f / fp;
    E -= d;
    if (Math.abs(d) < 1e-10) break;
  }
  return E;
}
function orbitalPosition(el, tDays) {
  const M = el.M0 + (2 * Math.PI / el.period) * tDays;
  const E = solveKepler(M, el.e);
  const cosE = Math.cos(E), sinE = Math.sin(E);
  const xv = el.a * (cosE - el.e);
  const yv = el.a * Math.sqrt(1 - el.e * el.e) * sinE;
  const cw = Math.cos(el.omega), sw = Math.sin(el.omega);
  const x1 = xv * cw - yv * sw;
  const y1 = xv * sw + yv * cw;
  const ci = Math.cos(el.i), si = Math.sin(el.i);
  const y2 = y1 * ci;
  const z2 = y1 * si;
  const cO = Math.cos(el.Omega), sO = Math.sin(el.Omega);
  const xe = x1 * cO - y2 * sO;
  const ye = x1 * sO + y2 * cO;
  return [xe, z2, -ye];
}

const elementsCache = {};
function getPlanetElements(p) {
  if (!elementsCache[p.id]) {
    elementsCache[p.id] = {
      a: p.orbit.semiMajorAxisAu, e: p.orbit.eccentricity, i: d2r(p.orbit.inclinationDeg),
      omega: d2r(p.orbit.argumentPeriapsisDeg), Omega: d2r(p.orbit.longitudeAscendingNodeDeg),
      M0: d2r(p.orbit.meanAnomalyAtEpochDeg), period: p.orbit.orbitalPeriodDays
    };
  }
  return elementsCache[p.id];
}

/* ============================================================
   3. ТЕКСТУРЫ И МАТЕРИАЛЫ
   ============================================================ */
const textureLoader = new THREE.TextureLoader();
const textureCache = new Map();

function loadTexture(url, { srgb = true, fallback = null, anisotropy = 1, generateMipmaps = false } = {}) {
  if (!url) return fallback;
  if (textureCache.has(url)) return textureCache.get(url);
  
  const tex = textureLoader.load(url);
  tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.anisotropy = anisotropy;
  tex.generateMipmaps = generateMipmaps;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  
  tex.onError = () => {
    console.warn(`[Texture] Failed to load ${url}.`);
    textureCache.set(url, fallback);
  };
  
  textureCache.set(url, tex);
  return tex;
}

function makeAtmosphereMaterial(color) {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: color }, uIntensity: { value: 0.8 } },
    vertexShader: `
      varying vec3 vNormalW;
      varying vec3 vViewDirW;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vNormalW = normalize(mat3(modelMatrix) * normal);
        vViewDirW = normalize(cameraPosition - wp.xyz);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uIntensity;
      varying vec3 vNormalW;
      varying vec3 vViewDirW;
      void main() {
        float rim = 1.0 - abs(dot(normalize(vNormalW), normalize(vViewDirW)));
        rim = pow(rim, 3.0);
        gl_FragColor = vec4(uColor, rim * uIntensity);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false
  });
}

function makeGlowTexture() {
  const S = 256;
  const canvas = document.createElement('canvas');
  canvas.width = S; canvas.height = S;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  grad.addColorStop(0, 'rgba(255,255,240,1)');
  grad.addColorStop(0.1, 'rgba(255,240,180,0.9)');
  grad.addColorStop(0.3, 'rgba(255,200,100,0.4)');
  grad.addColorStop(0.6, 'rgba(255,150,50,0.05)');
  grad.addColorStop(1, 'rgba(255,100,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, S, S);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ============================================================
   4. 3D СЦЕНА
   ============================================================ */
const MAP_ORBIT_BASE = 20;
const MAP_ORBIT_EXP = 0.55;
const MAP_PLANET_RADIUS_BASE = 1.5;
const MAP_SUN_RADIUS = 6;
const LOCAL_PLANET_RADIUS = 20;
const DAYS_PER_SEC = 0.05;

class SolarScene {
  constructor(container) {
    this.container = container;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000005);

    this.camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 8000);
    this.camera.position.set(0, 60, 160);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.rotateSpeed = 0.6;
    this.controls.minDistance = 10;
    this.controls.maxDistance = 700;

    this.ambient = new THREE.AmbientLight(0xffffff, 0.08);
    this.scene.add(this.ambient);
    
    this.mapLight = new THREE.PointLight(0xfff4e0, 3.5, 0, 0);
    this.scene.add(this.mapLight);
    
    this.localLight = new THREE.DirectionalLight(0xfff4e0, 0);
    this.scene.add(this.localLight);
    this.scene.add(this.localLight.target);

    this.stars = this.makeStars();
    this.scene.add(this.stars);

    this.mapGroup = new THREE.Group();
    this.localGroup = new THREE.Group();
    this.localGroup.visible = false;
    this.scene.add(this.mapGroup);
    this.scene.add(this.localGroup);

    // --- Визуальное Солнце для локальной сцены ---
    this.localSunGroup = new THREE.Group();
    const sunCore = new THREE.Mesh(
      new THREE.SphereGeometry(30, 32, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffea })
    );
    this.localSunGroup.add(sunCore);
    
    const sunGlowMat = new THREE.SpriteMaterial({
      map: makeGlowTexture(),
      color: 0xffddaa,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const sunGlow = new THREE.Sprite(sunGlowMat);
    sunGlow.scale.setScalar(500);
    this.localSunGroup.add(sunGlow);
    
    this.localGroup.add(this.localSunGroup);

    this.planetGroups = new Map();
    this.planetMeshes = new Map();
    this.planetOrbits = new Map();
    this.planetLabels = new Map();

    this.localPlanet = null;
    this.localPlanetMesh = null;
    this.localPlanetTilt = null;
    this.localPlanetAxis = null;
    this.localPlanetEquator = null;
    this.localBodies = [];
    this.cloudMesh = null;
    this.earthSunUniform = null;
    this.localCamPos = new THREE.Vector3();
    
    this.simDays = 0;
    this.timeScale = 1;
    this.paused = false;
    this.quality = 'high';
    this.mode = 'map';
    this.showOrbits = true;
    this.showAxes = false;
    this.showLabels = true;
    this.followObject = null;
    this.tween = null;
    
    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.pointerNdc = new THREE.Vector2();
    this.pointerDown = { x: 0, y: 0, t: 0 };
    
    this.sunTimer = 0;

    this.onSelect = null;

    this.buildMap();
    this.setScreen('start');

    window.addEventListener('resize', this.onResize);
    const dom = this.renderer.domElement;
    dom.addEventListener('pointerdown', this.onPointerDown);
    dom.addEventListener('pointerup', this.onPointerUp);

    this.clock.start();
    this.animate = this.animate.bind(this);
    this.raf = requestAnimationFrame(this.animate);
  }

  makeStars() {
    const N = 3000;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 2000 + Math.random() * 1500;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: 1.5, sizeAttenuation: false, transparent: true, opacity: 0.8 }));
  }

  buildMap() {
    const sunGeo = new THREE.SphereGeometry(MAP_SUN_RADIUS, 32, 16);
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffaa00'; ctx.fillRect(0,0,512,256);
    for(let i=0; i<1000; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? '#ffdd55' : '#ff6600';
      ctx.beginPath(); ctx.arc(Math.random()*512, Math.random()*256, Math.random()*8, 0, Math.PI*2); ctx.fill();
    }
    const sunTex = new THREE.CanvasTexture(canvas);
    sunTex.colorSpace = THREE.SRGBColorSpace;
    
    const sunMat = new THREE.MeshBasicMaterial({ map: sunTex });
    this.sunMesh = new THREE.Mesh(sunGeo, sunMat);
    this.mapGroup.add(this.sunMesh);

    for (const p of PLANETS) {
      const r = MAP_PLANET_RADIUS_BASE * Math.pow(p.physical.meanRadiusKm / 6371, 0.5);
      const group = new THREE.Group();
      const tilt = new THREE.Group();
      tilt.rotation.z = d2r(p.rotation.axialTiltDeg);
      group.add(tilt);

      const albedo = loadTexture(p.textures.albedo, { generateMipmaps: true, anisotropy: 4 });
      const mat = new THREE.MeshStandardMaterial({ map: albedo, roughness: 0.9 });
      
      const geo = new THREE.SphereGeometry(r, 32, 16);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData.selectable = { type: 'planet', id: p.id };
      tilt.add(mesh);

      if (p.visual.atmosphereEnabled) {
        const atmo = new THREE.Mesh(new THREE.SphereGeometry(r * 1.03, 32, 16), makeAtmosphereMaterial(new THREE.Color(p.visual.color)));
        atmo.userData.noPick = true;
        tilt.add(atmo);
      }

      const orbit = this.makeOrbitLine(p);
      this.planetOrbits.set(p.id, orbit);
      this.mapGroup.add(orbit);

      const label = this.makeLabel(p.name);
      label.position.set(0, r + 1.5, 0);
      group.add(label);
      this.planetLabels.set(p.id, label);

      this.mapGroup.add(group);
      this.planetGroups.set(p.id, group);
      this.planetMeshes.set(p.id, mesh);
    }
  }

  makeOrbitLine(p) {
    const el = getPlanetElements(p);
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const t = (i / 128) * el.period;
      const [x, y, z] = orbitalPosition(el, t);
      const r = Math.hypot(x, y, z);
      const s = (MAP_ORBIT_BASE * Math.pow(r, MAP_ORBIT_EXP)) / r;
      pts.push(new THREE.Vector3(x * s, y * s, z * s));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    return new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x5b9dff, transparent: true, opacity: 0.3 }));
  }

  setScreen(s) {
    if (s === 'start') {
      this.mapGroup.visible = false;
      this.localGroup.visible = false;
      this.mapLight.intensity = 0;
      this.localLight.intensity = 0;
      this.mode = 'map';
      this.followObject = null;
      this.animateCamera(new THREE.Vector3(0, 18, 60), new THREE.Vector3(0, 0, 0), 1.5);
    } else if (s === 'map') {
      this.mapGroup.visible = true;
      this.localGroup.visible = false;
      this.mode = 'map';
      this.followObject = null;
      this.mapLight.intensity = 3.5;
      this.localLight.intensity = 0;
      this.controls.minDistance = 20;
      this.controls.maxDistance = 700;
      this.animateCamera(new THREE.Vector3(0, 95, 175), new THREE.Vector3(0, 0, 0), 1.2);
    }
  }

  focusPlanet(id) {
    this.mode = 'local';
    this.mapGroup.visible = false;
    this.localGroup.visible = true;
    this.followObject = null;
    this.buildLocal(id);
    this.controls.minDistance = LOCAL_PLANET_RADIUS * 1.25;
    this.controls.maxDistance = LOCAL_PLANET_RADIUS * 14;
    this.animateCamera(this.localCamPos.clone(), new THREE.Vector3(0, 0, 0), 1.2);
    this.mapLight.intensity = 0;
    this.localLight.intensity = 3.5;
    this.ambient.intensity = 0.08;
  }

  focusSatellite(planetId, satId) {
    if (this.localPlanet?.id !== planetId) return;
    const b = this.localBodies.find(x => x.data.id === satId);
    if (!b) return;
    
    this.followObject = b.mesh;
    const wp = new THREE.Vector3();
    b.mesh.getWorldPosition(wp);
    
    const radius = b.mesh.geometry.parameters.radius || 1;
    const d = radius * 4.0;
    
    this.animateCamera(wp.clone().add(new THREE.Vector3(d, d * 0.6, d)), wp, 1.0);
    this.controls.minDistance = Math.max(0.2, radius * 1.5);
    this.controls.maxDistance = d * 10;
  }

  buildLocal(planetId) {
    this.clearLocal();
    const p = PLANET_BY_ID[planetId];
    if (!p) return;
    this.localPlanet = p;
    const R = LOCAL_PLANET_RADIUS;

    const tilt = new THREE.Group();
    tilt.rotation.z = d2r(p.rotation.axialTiltDeg);
    this.localGroup.add(tilt);
    this.localPlanetTilt = tilt;

    const albedo = loadTexture(p.textures.albedo, { generateMipmaps: true, anisotropy: 4 });
    const mat = new THREE.MeshStandardMaterial({ map: albedo, roughness: 0.85 });
    
    if (p.textures.nightLights) {
      const nightTex = loadTexture(p.textures.nightLights, { generateMipmaps: true });
      mat.emissiveMap = nightTex;
      mat.emissive = new THREE.Color(0xffdd99);
      mat.emissiveIntensity = 1.8;
      this.applyNightLightsShader(mat);
    }

    const geo = new THREE.SphereGeometry(R, 64, 32);
    const mesh = new THREE.Mesh(geo, mat);
    tilt.add(mesh);
    this.localPlanetMesh = mesh;
    mesh.userData.selectable = { type: 'planet', id: p.id };

    if (p.textures.clouds) {
      const cloudTex = loadTexture(p.textures.clouds, { generateMipmaps: true });
      const cloudMat = new THREE.MeshStandardMaterial({
        map: cloudTex, transparent: true, opacity: 0.6, depthWrite: false
      });
      this.cloudMesh = new THREE.Mesh(new THREE.SphereGeometry(R * 1.01, 64, 32), cloudMat);
      this.cloudMesh.userData.noPick = true;
      tilt.add(this.cloudMesh);
    }

    if (p.visual.atmosphereEnabled) {
      const atmo = new THREE.Mesh(new THREE.SphereGeometry(R * 1.035, 32, 16), makeAtmosphereMaterial(new THREE.Color(p.visual.color)));
      atmo.userData.noPick = true;
      tilt.add(atmo);
    }

    if (p.textures.ring) {
      const ringTex = loadTexture(p.textures.ring, { generateMipmaps: true });
      const ringGeo = new THREE.RingGeometry(R * 1.3, R * 2.3, 64, 2);
      const pos = ringGeo.attributes.position;
      const uv = ringGeo.attributes.uv;
      for (let i = 0; i < pos.count; i++) {
        const r = Math.hypot(pos.getX(i), pos.getY(i));
        uv.setXY(i, (r - R*1.3) / (R*2.3 - R*1.3), 0.5);
      }
      uv.needsUpdate = true;
      const ringMat = new THREE.MeshBasicMaterial({ map: ringTex, transparent: true, side: THREE.DoubleSide, depthWrite: false, opacity: 0.95 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      tilt.add(ringMesh);
    }

    this.localPlanetAxis = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,-R*1.5,0), new THREE.Vector3(0,R*1.5,0)]), new THREE.LineBasicMaterial({ color: 0xffaa66 }));
    this.localPlanetAxis.visible = this.showAxes;
    tilt.add(this.localPlanetAxis);

    this.localPlanetEquator = this.makeCircleLine(R * 1.01, 64, 0x66ccff, 0.8);
    this.localPlanetEquator.visible = this.showAxes;
    tilt.add(this.localPlanetEquator);

    const plabel = this.makeLabel(p.name, 1.4);
    plabel.position.set(0, R * 1.2, 0);
    mesh.add(plabel);

    const sats = SATS_BY_PLANET[p.id] || [];
    const aValues = sats.map(s => s.orbit.semiMajorAxisKm);
    const minA = Math.min(...aValues), maxA = Math.max(...aValues);
    const logMin = Math.log10(minA), logMax = Math.log10(maxA);

    for (const s of sats) {
      const t = maxA === minA ? 0.5 : (Math.log10(s.orbit.semiMajorAxisKm) - logMin) / (logMax - logMin);
      const orbitR = R * (2.0 + 3.5 * t);
      const satR = R * Math.min(0.2, Math.max(0.05, 0.05 + 0.3 * (s.physical.meanRadiusKm / p.physical.meanRadiusKm)));

      const sg = new THREE.Group();
      tilt.add(sg);

      const satTex = loadTexture(s.textures.albedo);
      const satNormal = loadTexture(s.textures.normal, { srgb: false });
      const satBump = loadTexture(s.textures.bump, { srgb: false });

      const satGeo = new THREE.SphereGeometry(satR, 24, 12);

      const smesh = new THREE.Mesh(
        satGeo,
        new THREE.MeshStandardMaterial({ 
          map: satTex, 
          normalMap: satNormal || undefined,
          bumpMap: satBump || undefined,
          bumpScale: satBump ? 0.02 : undefined,
          color: satTex ? 0xffffff : s.visual.color, 
          roughness: 0.95 
        })
      );
      smesh.userData.selectable = { type: 'satellite', id: s.id, parentPlanetId: p.id };
      sg.add(smesh);

      const orbitLine = this.makeCircleLine(orbitR, 32, 0x6fa8dc, 0.25);
      orbitLine.visible = this.showOrbits;
      tilt.add(orbitLine);

      const label = this.makeLabel(s.name);
      label.position.set(0, satR * 1.8, 0);
      label.visible = this.showLabels;
      smesh.add(label);

      this.localBodies.push({ mesh: smesh, group: sg, data: s, orbitRadius: orbitR, orbitLine, label });
    }

    this.updateSunDirection();
    this.updateCameraPreset();
  }

  updateSunDirection() {
    if (!this.localPlanet) return;
    const el = getPlanetElements(this.localPlanet);
    const [px, py, pz] = orbitalPosition(el, this.simDays);
    
    // Вектор от Солнца к планете
    const lightDir = new THREE.Vector3(px, py, pz).normalize().negate();
    
    // Ставим локальное Солнце на расстоянии 4000 единиц
    const sunDist = 4000;
    const sunPos = lightDir.clone().multiplyScalar(sunDist);
    this.localLight.position.copy(sunPos);
    this.localSunGroup.position.copy(sunPos);

    this.localLight.target.position.set(0, 0, 0);
    this.localLight.target.updateMatrixWorld();
    if (this.earthSunUniform) this.earthSunUniform.value.copy(lightDir);
  }

  updateCameraPreset() {
    if (!this.localPlanet) return;
    const lightDir = this.localLight.position.clone().normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const side = new THREE.Vector3().crossVectors(lightDir, up).normalize();
    const camDir = new THREE.Vector3().addScaledVector(lightDir, 0.5).addScaledVector(side, 0.7).addScaledVector(up, 0.3).normalize();
    this.localCamPos.copy(camDir.multiplyScalar(LOCAL_PLANET_RADIUS * 4.5));
  }

  applyNightLightsShader(mat) {
    const uniform = { value: new THREE.Vector3(1, 0, 0) };
    this.earthSunUniform = uniform;
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uSunDirWorld = uniform;
      shader.vertexShader = 'varying vec3 vWorldNormal;\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\nvWorldNormal = normalize(mat3(modelMatrix) * objectNormal);'
      );
      shader.fragmentShader = 'uniform vec3 uSunDirWorld;\nvarying vec3 vWorldNormal;\n' + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <emissivemap_fragment>',
        '#include <emissivemap_fragment>\n' +
        'float nf = smoothstep(0.2, -0.2, dot(normalize(vWorldNormal), normalize(uSunDirWorld)));\n' +
        'totalEmissiveRadiance *= nf;'
      );
    };
    mat.customProgramCacheKey = () => 'earth-night-lights';
  }

  clearLocal() {
    this.localGroup.traverse((obj) => {
      if (obj === this.localSunGroup) return; // Не удаляем солнце
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        for (const m of mats) {
          if (m.map && !textureCache.has(m.map.source?.data?.src)) m.map.dispose();
          if (m.normalMap && !textureCache.has(m.normalMap.source?.data?.src)) m.normalMap.dispose();
          if (m.bumpMap && !textureCache.has(m.bumpMap.source?.data?.src)) m.bumpMap.dispose();
          m.dispose();
        }
      }
    });
    // Очищаем все, кроме localSunGroup
    const sun = this.localSunGroup;
    this.localGroup.clear();
    this.localGroup.add(sun);

    this.localBodies = [];
    this.localPlanetMesh = null;
    this.localPlanetTilt = null;
    this.localPlanetAxis = null;
    this.localPlanetEquator = null;
    this.cloudMesh = null;
    this.localPlanet = null;
    this.followObject = null;
    this.earthSunUniform = null;
  }

  makeCircleLine(r, N, color, opacity) {
    const pts = [];
    for (let i = 0; i <= N; i++) {
      const a = (i / N) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
    }
    return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
  }

  makeLabel(text, scale = 1) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = '600 32px system-ui, sans-serif';
    const w = Math.ceil(ctx.measureText(text).width) + 24;
    canvas.width = w; canvas.height = 56;
    const c = canvas.getContext('2d');
    c.font = '600 32px system-ui, sans-serif';
    c.fillStyle = 'rgba(10,14,24,0.7)'; c.fillRect(0, 0, w, 56);
    c.fillStyle = '#dde4f5'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(text, w / 2, 30);
    const tex = new THREE.CanvasTexture(canvas); tex.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false }));
    sprite.scale.set((w / 56) * 0.6 * scale, 0.6 * scale, 1);
    return sprite;
  }

  animateCamera(toPos, toTarget, dur) {
    this.tween = { fromPos: this.camera.position.clone(), toPos, fromTarget: this.controls.target.clone(), toTarget, t: 0, dur };
  }

  onResize = () => {
    const w = this.container.clientWidth, h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  onPointerDown = (e) => { this.pointerDown = { x: e.clientX, y: e.clientY, t: performance.now() }; };
  onPointerUp = (e) => {
    if (Math.hypot(e.clientX - this.pointerDown.x, e.clientY - this.pointerDown.y) > 8 || performance.now() - this.pointerDown.t > 500) return;
    
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointerNdc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointerNdc, this.camera);
    
    const targets = this.mode === 'map' 
      ? Array.from(this.planetMeshes.values()) 
      : [this.localPlanetMesh, ...this.localBodies.map(b => b.mesh)].filter(Boolean);
      
    const hits = this.raycaster.intersectObjects(targets, false);
    if (hits.length > 0 && hits[0].object.userData.selectable) {
      const sel = hits[0].object.userData.selectable;
      if (this.onSelect) this.onSelect(sel.type, sel.id, sel.parentPlanetId);
    }
  };

  animate() {
    this.raf = requestAnimationFrame(this.animate);
    const dt = Math.min(this.clock.getDelta(), 0.1);

    if (!this.paused) this.simDays += dt * this.timeScale * DAYS_PER_SEC;

    if (this.mapGroup.visible) {
      for (const p of PLANETS) {
        const group = this.planetGroups.get(p.id);
        const mesh = this.planetMeshes.get(p.id);
        if (!group || !mesh) continue;
        const el = getPlanetElements(p);
        const [x, y, z] = orbitalPosition(el, this.simDays);
        const r = Math.hypot(x, y, z);
        const s = (MAP_ORBIT_BASE * Math.pow(r, MAP_ORBIT_EXP)) / r;
        group.position.set(x * s, y * s, z * s);
        mesh.rotation.y = (2 * Math.PI / p.rotation.periodDays) * this.simDays;
      }
    }

    if (this.localGroup.visible && this.localPlanet) {
      const p = this.localPlanet;
      if (this.localPlanetMesh) this.localPlanetMesh.rotation.y = (2 * Math.PI / p.rotation.periodDays) * this.simDays;
      if (this.cloudMesh) this.cloudMesh.rotation.y = (2 * Math.PI / (p.rotation.periodDays * 1.05)) * this.simDays;
      
      for (const b of this.localBodies) {
        const dir = b.data.orbit.direction === 'retrograde' ? -1 : 1;
        const ang = dir * (2 * Math.PI / b.data.orbit.orbitalPeriodDays) * this.simDays;
        b.group.position.set(Math.cos(ang) * b.orbitRadius, 0, Math.sin(ang) * b.orbitRadius);
        if (b.data.rotation.synchronous) b.mesh.rotation.y = -ang;
      }

      this.sunTimer++;
      if (this.sunTimer > 30) {
        this.updateSunDirection();
        this.sunTimer = 0;
      }
    }

    if (this.followObject && this.localGroup.visible) {
      const wp = new THREE.Vector3();
      this.followObject.getWorldPosition(wp);
      this.controls.target.lerp(wp, 0.18);
    }

    if (this.tween) {
      this.tween.t += dt / this.tween.dur;
      const k = Math.min(1, this.tween.t);
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      this.camera.position.lerpVectors(this.tween.fromPos, this.tween.toPos, e);
      this.controls.target.lerpVectors(this.tween.fromTarget, this.tween.toTarget, e);
      if (k >= 1) this.tween = null;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

/* ============================================================
   5. UI & STATE
   ============================================================ */
let engine = null;
const state = {
  screen: 'start', selectedPlanetId: null, selectedSatelliteId: null,
  compareIds: ['earth', 'jupiter'], compareOpen: false,
  timeScale: 1, paused: false, showOrbits: true, showAxes: false, showLabels: true,
  infoOpen: true, satellitesOpen: true
};

function syncEngine() {
  if (!engine) return;
  engine.timeScale = state.timeScale;
  engine.paused = state.paused;
  engine.showOrbits = state.showOrbits;
  engine.showAxes = state.showAxes;
  engine.showLabels = state.showLabels;
  
  if (!state.selectedSatelliteId) {
    engine.followObject = null;
  }

  for (const l of engine.planetOrbits.values()) l.visible = state.showOrbits;
  for (const b of engine.localBodies) { b.orbitLine.visible = state.showOrbits; b.label.visible = state.showLabels; }
  for (const l of engine.planetLabels.values()) l.visible = state.showLabels;
  if (engine.localPlanetAxis) engine.localPlanetAxis.visible = state.showAxes;
  if (engine.localPlanetEquator) engine.localPlanetEquator.visible = state.showAxes;
}

function setState(patch) { Object.assign(state, patch); syncEngine(); renderUI(); }

const h = (tag, ...args) => {
  const el = document.createElement(tag);
  if (args.length > 0 && typeof args[0] === 'object' && args[0] !== null && !Array.isArray(args[0]) && !(args[0] instanceof Node)) {
    const attrs = args.shift();
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') el.className = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
      else if (v !== false && v != null) el.setAttribute(k, v);
    }
  }
  args.flat(Infinity).forEach(c => { if (c != null && c !== false) el.append(c instanceof Node ? c : document.createTextNode(String(c))); });
  return el;
};

const typeLabel = t => t === 'terrestrial' ? 'земная группа' : t === 'gas_giant' ? 'газовый гигант' : 'ледяной гигант';

function renderUI() {
  const ui = document.getElementById('ui');
  ui.innerHTML = '';
  if (state.screen === 'start') ui.append(buildStartScreen());
  else if (state.screen === 'map') ui.append(buildTopbarMap(), buildMapSidebar(), buildScaleDisclaimer());
  else if (state.screen === 'viewer') ui.append(buildTopbarViewer(), buildInfoPanel(), buildSatellitesPanel(), buildBottomBar());
  if (state.compareOpen) ui.append(buildCompareModal());
}

const buildStartScreen = () => h('div', { class: 'start-screen' },
  h('div', { class: 'start-card' },
    h('div', { class: 'eyebrow' }, 'Образовательное 3D-приложение'),
    h('h1', {}, 'Обозреватель', h('br'), 'Солнечной системы'),
    h('p', { class: 'lead' }, 'Интерактивная карта, реалистичное освещение, наклон оси, вращение и орбиты восьми планет и двадцати крупных спутников.'),
    h('button', { class: 'btn primary large', onClick: () => { setState({ screen: 'map' }); engine.setScreen('map'); } }, 'Начать исследование'),
    h('div', { class: 'start-meta' }, h('span', {}, 'Three.js · WebGL 2'), h('span', {}, 'Версия 2.0')),
    h('div', { class: 'attribution' }, 'Текстуры: Solar System Scope (CC BY 4.0), Celestia Motherlode (CC0), FarGetaNik, Askaniy. Физические параметры: NASA/JPL.')
  )
);

const buildTopbarMap = () => h('header', { class: 'topbar' },
  h('div', { class: 'brand' }, 'Обозреватель Солнечной системы'),
  h('div', { class: 'topbar-actions' })
);

const buildTopbarViewer = () => {
  const p = PLANET_BY_ID[state.selectedPlanetId];
  const s = state.selectedSatelliteId ? SATELLITE_BY_ID[state.selectedSatelliteId] : null;
  
  return h('header', { class: 'topbar' },
    h('button', { class: 'btn ghost', onClick: () => { 
      if (s) { 
        setState({ selectedSatelliteId: null }); 
        engine.focusPlanet(p.id);
      } else { 
        setState({ screen: 'map' }); 
        engine.setScreen('map'); 
      }
    } }, s ? '← ' + p.name : '← Карта'),
    
    h('div', { class: 'title' }, 
      h('span', { class: 'dot', style: { background: s ? s.visual.color : p.visual.color } }), 
      h('span', { class: 'name' }, s ? s.name : p.name), 
      h('span', { class: 'sub' }, s ? p.name : p.englishName)
    ),
    h('div', { class: 'topbar-actions' }, h('button', { class: 'btn', onClick: () => setState({ compareOpen: true }) }, 'Сравнение'))
  );
};

const buildMapSidebar = () => h('aside', { class: 'sidebar left' },
  h('h2', {}, 'Планеты'),
  h('ul', { class: 'planet-list' }, PLANETS.map(p => h('li', {},
    h('button', { class: `planet-item ${state.selectedPlanetId === p.id ? 'active' : ''}`, onClick: () => {
      setState({ screen: 'viewer', selectedPlanetId: p.id, selectedSatelliteId: null });
      engine.focusPlanet(p.id);
    } },
      h('span', { class: 'dot', style: { background: p.visual.color } }),
      h('span', { class: 'name' }, p.name),
      h('span', { class: 'type' }, typeLabel(p.type))
    )
  )))
);

const buildScaleDisclaimer = () => h('div', { class: 'scale-disclaimer' }, 'Схема условная. Размеры планет и расстояния между ними не соответствуют реальному масштабу.');

const buildInfoPanel = () => {
  const isSat = !!state.selectedSatelliteId;
  const body = isSat 
    ? SATELLITE_BY_ID[state.selectedSatelliteId] 
    : PLANET_BY_ID[state.selectedPlanetId];
    
  if (!body) return null;
  const open = state.infoOpen;

  return h('section', { class: `panel info-panel ${open ? '' : 'collapsed'}` },
    h('header', { class: 'panel-head', onClick: () => setState({ infoOpen: !open }) }, 
      h('h2', {}, isSat ? 'Спутник' : 'Параметры'), 
      h('button', { class: 'icon-btn' }, open ? '–' : '+')
    ),
    open ? h('div', { class: 'panel-body' },
      h('h3', { style: { marginTop: 0, color: 'var(--text)', textTransform: 'none', fontSize: '18px', letterSpacing: 'normal' } }, body.name),
      h('p', { class: 'description' }, body.description),
      h('dl', { class: 'kv' },
        h('dt', {}, 'Средний радиус'), h('dd', {}, fmtNumber(body.physical.meanRadiusKm, 1) + ' км'),
        h('dt', {}, 'Масса'), h('dd', {}, fmtScientific(body.physical.massKg) + ' кг'),
        h('dt', {}, 'Плотность'), h('dd', {}, body.physical.densityGcm3 + ' г/см³'),
        !isSat ? h('dt', {}, 'Гравитация') : null, 
        !isSat ? h('dd', {}, body.physical.gravityMs2 + ' м/с²') : null,
        h('dt', {}, 'Период вращения'), h('dd', {}, fmtDays(body.rotation.periodDays)),
        h('dt', {}, 'Направление'), h('dd', {}, body.rotation.direction === 'prograde' ? 'прямое' : 'ретроградное'),
        !isSat ? h('dt', {}, 'Наклон оси') : null, 
        !isSat ? h('dd', {}, body.rotation.axialTiltDeg + '°') : null,
        h('dt', {}, 'Орбитальный период'), h('dd', {}, fmtDays(body.orbit.orbitalPeriodDays))
      ),
      h('h3', {}, 'Факты'), h('ul', { class: 'facts' }, body.facts.map(f => h('li', {}, f))),
      h('h3', {}, 'Источники'), h('ul', { class: 'sources' }, body.dataSources.map(s => h('li', {}, s)))
    ) : null
  );
};

const buildSatellitesPanel = () => {
  const p = PLANET_BY_ID[state.selectedPlanetId]; if (!p) return null;
  const sats = SATS_BY_PLANET[p.id] || [];
  if (sats.length === 0) return h('section', { class: 'panel satellites-panel' }, h('header', { class: 'panel-head' }, h('h2', {}, 'Спутники')), h('div', { class: 'panel-body' }, h('p', { class: 'muted' }, 'Нет известных спутников.')));
  return h('section', { class: `panel satellites-panel ${state.satellitesOpen ? '' : 'collapsed'}` },
    h('header', { class: 'panel-head', onClick: () => setState({ satellitesOpen: !state.satellitesOpen }) }, h('h2', {}, 'Спутники ', h('span', { class: 'count' }, sats.length)), h('button', { class: 'icon-btn' }, state.satellitesOpen ? '–' : '+')),
    state.satellitesOpen ? h('div', { class: 'panel-body' },
      h('ul', { class: 'sat-list' }, sats.map(s => h('li', {},
        h('button', { class: `sat-item ${state.selectedSatelliteId === s.id ? 'active' : ''}`, onClick: () => {
          setState({ selectedSatelliteId: s.id });
          engine.focusSatellite(p.id, s.id);
        } },
          h('span', { class: 'dot', style: { background: s.visual.color } }),
          h('span', { class: 'name' }, s.name),
          h('span', { class: 'meta' }, fmtDays(s.orbit.orbitalPeriodDays))
        )
      )))
    ) : null
  );
};

const buildBottomBar = () => {
  const dateEl = h('span', { class: 'date' }, '');
  const timer = setInterval(() => {
    if (!engine) return;
    const J2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
    dateEl.textContent = new Date(J2000 + engine.simDays * 86400000).toISOString().slice(0, 10);
  }, 250);
  const bar = h('div', { class: 'bottom-bar' },
    h('div', { class: 'time-group' },
      h('button', { class: 'btn icon', onClick: () => setState({ paused: !state.paused }) }, state.paused ? '▶' : '⏸'),
      ...[1, 10, 100, 1000].map(s => h('button', { class: `btn chip ${state.timeScale === s ? 'active' : ''}`, onClick: () => setState({ timeScale: s }) }, '×' + s)),
      h('button', { class: 'btn icon', onClick: () => { if(engine) engine.simDays = 0; } }, '⟲'),
      dateEl
    ),
    h('div', { class: 'view-group' },
      h('button', { class: `btn chip ${state.showOrbits ? 'active' : ''}`, onClick: () => setState({ showOrbits: !state.showOrbits }) }, 'Орбиты'),
      h('button', { class: `btn chip ${state.showAxes ? 'active' : ''}`, onClick: () => setState({ showAxes: !state.showAxes }) }, 'Ось'),
      h('button', { class: `btn chip ${state.showLabels ? 'active' : ''}`, onClick: () => setState({ showLabels: !state.showLabels }) }, 'Подписи')
    )
  );
  bar.addEventListener('DOMNodeRemovedFromDocument', () => clearInterval(timer));
  return bar;
};

const buildCompareModal = () => {
  const sel = state.compareIds.map(id => PLANET_BY_ID[id]).filter(Boolean);
  const logBar = (v, min, max) => {
    const t = (Math.log10(Math.max(v, min)) - Math.log10(min)) / (Math.log10(max) - Math.log10(min));
    return Math.max(4, Math.min(100, t * 100)) + '%';
  };
  const rMin = Math.min(...PLANETS.map(p => p.physical.meanRadiusKm)), rMax = Math.max(...PLANETS.map(p => p.physical.meanRadiusKm));
  const mMin = Math.min(...PLANETS.map(p => p.physical.massKg)), mMax = Math.max(...PLANETS.map(p => p.physical.massKg));
  return h('div', { class: 'modal-backdrop', onClick: () => setState({ compareOpen: false }) },
    h('div', { class: 'modal', onClick: e => e.stopPropagation() },
      h('header', { class: 'modal-head' }, h('h2', {}, 'Сравнение планет'), h('button', { class: 'icon-btn', onClick: () => setState({ compareOpen: false }) }, '×')),
      h('div', { class: 'compare-picker' }, PLANETS.map(p => h('button', { class: `btn chip small ${state.compareIds.includes(p.id) ? 'active' : ''}`, onClick: () => {
        const c = state.compareIds;
        setState({ compareIds: c.includes(p.id) ? c.filter(x => x !== p.id) : [...c, p.id].slice(0, 4) });
      } }, p.name))),
      h('div', { class: 'compare-grid' }, sel.map(p => h('div', { class: 'compare-col' },
        h('h3', {}, h('span', { class: 'dot', style: { background: p.visual.color } }), p.name),
        h('div', { class: 'bar-row' }, h('span', {}, 'Радиус'), h('div', { class: 'bar' }, h('i', { style: { width: logBar(p.physical.meanRadiusKm, rMin, rMax) } })), h('b', {}, fmtNumber(p.physical.meanRadiusKm) + ' км')),
        h('div', { class: 'bar-row' }, h('span', {}, 'Масса'), h('div', { class: 'bar' }, h('i', { style: { width: logBar(p.physical.massKg, mMin, mMax) } })), h('b', {}, fmtScientific(p.physical.massKg) + ' кг')),
        h('dl', { class: 'kv compact' }, h('dt', {}, 'Плотность'), h('dd', {}, p.physical.densityGcm3 + ' г/см³'), h('dt', {}, 'Спутники'), h('dd', {}, p.satelliteIds.length))
      )))
    )
  );
};

/* ============================================================
   6. ИНИЦИАЛИЗАЦИЯ
   ============================================================ */
const init = () => {
  engine = new SolarScene(document.getElementById('canvas-host'));
  engine.onSelect = (type, id, parent) => {
    if (type === 'planet') {
      setState({ screen: 'viewer', selectedPlanetId: id, selectedSatelliteId: null });
      engine.focusPlanet(id);
    } else if (type === 'satellite') {
      setState({ selectedSatelliteId: id });
      engine.focusSatellite(parent, id);
    }
  };
  syncEngine();
  renderUI();
};

init();