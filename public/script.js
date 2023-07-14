// Cycle of 4 towers every 8 hours
const towersCycle = [
  "mortar-monkey",
  "engineer-monkey",
  "beast-handler",
  "ninja-monkey",
  "super-monkey",
  "sniper-monkey",
  "boomerang-monkey",
  "dartling-gunner",
  "druid",
  "monkey-ace",
  "monkey-sub",
  "glue-gunner",
  "ice-monkey",
  "dart-monkey",
  "banana-farm",
  "monkey-village",
  "alchemist",
  "spike-factory",
  "bomb-shooter",
  "heli-pilot",
  "monkey-buccaneer",
  "tack-shooter",
  "wizard-monkey",
];

// Cycle of 4 towers every 8 hours, but in plain English
const towersEnglish = towersCycle.map((tower) =>
  tower.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
);

const combinedList = towersCycle.map((tower, index) => ({
  towerFileName: tower,
  towerEnglishName: towersEnglish[index],
}));

console.log(combinedList);
