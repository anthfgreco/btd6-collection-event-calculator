import * as dayjs from "dayjs";
import TowerCard from "./TowerCard";

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

const towersEnglish = towersCycle.map((tower) =>
  tower.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
);

// 12pm boat, tack, wizard, mortar

// 8pm engineer, beast, ninja, super

// 4am july 14
// Sniper Monkey
// Boomerang Monkey
// Dartling Gunner
// Druid

function App() {
  let startToEndDateList = [];
  let offsetList = [];

  // Ends July 24th 8pm NZST
  // Ends July 24th 4am EST

  let startDate = dayjs(new Date(2023, 6, 10, 12));
  let offset = 7;
  let endDate = dayjs(new Date(2023, 6, 24, 4));

  while (startDate.isBefore(endDate)) {
    startToEndDateList.push(startDate);
    offsetList.push(offset);
    startDate = startDate.add(8, "hour");
    offset += 4;
  }

  let now = dayjs();

  let dateAndOffsetList = [];

  for (let i = 0; i < startToEndDateList.length; i++) {
    if (startToEndDateList[i].isAfter(now.subtract(8, "hour"))) {
      dateAndOffsetList.push([
        startToEndDateList[i],
        (offsetList[i] + 0) % towersEnglish.length,
        (offsetList[i] + 1) % towersEnglish.length,
        (offsetList[i] + 2) % towersEnglish.length,
        (offsetList[i] + 3) % towersEnglish.length,
      ]);
    }
  }

  return (
    <main className="flex max-w-[600px] flex-col text-center">
      <h1 className="mb-8 text-5xl">
        BTD6 Collection Event
        <br />
        Calculator
      </h1>

      <div>
        {dateAndOffsetList.map(
          ([date, towerIndex1, towerIndex2, towerIndex3, towerIndex4]) => (
            <div className="mb-8" key={date}>
              <h2 className="p-2 text-2xl font-semibold">
                {date.format("dddd MMMM D h:mma")}
              </h2>

              <div className="flex flex-row justify-center space-x-3">
                {[towerIndex1, towerIndex2, towerIndex3, towerIndex4].map(
                  (index) => (
                    <TowerCard
                      key={index}
                      tower={towersCycle[index]}
                      towerEnglish={towersEnglish[index]}
                    />
                  ),
                )}
              </div>
            </div>
          ),
        )}
      </div>
    </main>
  );
}

export default App;
