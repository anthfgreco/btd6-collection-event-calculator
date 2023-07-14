import * as dayjs from "dayjs";
import TowerCard from "./TowerCard";
import { useState } from "react";
import { TOWERS } from "./towers";
import Fuse from "fuse.js";

// American Independence Day Event
// Ends July 24th 8pm NZST
// Ends July 24th 4am EST

let startDate = dayjs(new Date(2023, 6, 10, 12));
let offset = 7;
let endDate = dayjs(new Date(2023, 6, 24, 4));

let startToEndDateList = [];
let offsetList = [];

while (startDate.isBefore(endDate)) {
  startToEndDateList.push(startDate);
  offsetList.push(offset);

  startDate = startDate.add(8, "hour");
  offset += 4;
}

const fuse = new Fuse(TOWERS, {
  keys: ["towerEnglishName", "aliases"],
});

function App() {
  const [filterText, setFilterText] = useState("");

  let fuseResult = fuse.search(filterText, { limit: 1 });
  if (fuseResult.length > 0) {
    console.log(fuseResult[0].item);
  }

  let now = dayjs();

  let dateAndOffsetList = [];

  for (let i = 0; i < startToEndDateList.length; i++) {
    if (startToEndDateList[i].isAfter(now.subtract(8, "hour"))) {
      dateAndOffsetList.push([
        startToEndDateList[i],
        (offsetList[i] + 0) % TOWERS.length,
        (offsetList[i] + 1) % TOWERS.length,
        (offsetList[i] + 2) % TOWERS.length,
        (offsetList[i] + 3) % TOWERS.length,
      ]);
    }
  }

  return (
    <main className="flex max-w-[600px] flex-col items-center text-center">
      <h1 className="mb-8 text-5xl">
        BTD6 Collection Event
        <br />
        Calculator
      </h1>

      <input
        type="text"
        value={filterText}
        placeholder="Search tower..."
        onChange={(e) => setFilterText(e.target.value)}
        className="mb-8 max-w-[250px] rounded-lg border border-gray-300 bg-gray-100 p-1 shadow dark:border-gray-700 dark:bg-gray-800"
      />

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
                      towerFileName={TOWERS[index].towerFileName}
                      towerEnglishName={TOWERS[index].towerEnglishName}
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
