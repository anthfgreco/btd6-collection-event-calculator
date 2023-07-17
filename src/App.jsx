import * as dayjs from "dayjs";
import TowerCard from "./TowerCard";
import { useState } from "react";
import { TOWERS } from "./towers";
import Fuse from "fuse.js";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import advanced from "dayjs/plugin/advancedFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advanced);

let timezoneName = dayjs.tz.guess();
let timezoneAbbreviation = dayjs().tz(timezoneName).format("zzz");

console.log(
  `Guessed your current timezone to be: ${timezoneName} (${timezoneAbbreviation})`,
);

// American Independence Day Event
// Ends July 24th 8pm NZST
// Ends July 24th 4am EST

let startDate = dayjs.tz(new Date(2023, 6, 10, 12), "America/Toronto");
let startingIndex = 7;
let endDate = dayjs.tz(new Date(2023, 6, 24, 4), "America/Toronto");
let startToEndDateList = [];
let indexList = [];

while (startDate.isBefore(endDate)) {
  startToEndDateList.push(startDate);
  indexList.push([
    (startingIndex + 0) % TOWERS.length,
    (startingIndex + 1) % TOWERS.length,
    (startingIndex + 2) % TOWERS.length,
    (startingIndex + 3) % TOWERS.length,
  ]);

  startDate = startDate.add(8, "hour");
  startingIndex += 4;
}

const fuse = new Fuse(TOWERS, {
  keys: ["towerEnglishName", "aliases"],
});

function App() {
  const [filterText, setFilterText] = useState("");

  let fuseResult = fuse.search(filterText, { limit: 1 });
  if (fuseResult.length > 0) {
    console.log(fuseResult[0].item.towerFileName);
  }

  // Build list of dates and indices
  let now = dayjs();
  let dateAndIndexList = [];
  for (let i = 0; i < startToEndDateList.length; i++) {
    if (startToEndDateList[i].isAfter(now.subtract(8, "hour"))) {
      let timezoneConvertedDate = startToEndDateList[i].tz(timezoneName);
      let towerIndices = indexList[i];
      dateAndIndexList.push([timezoneConvertedDate, towerIndices]);
    }
  }

  const rows = [];

  // filterText.length is the number of characters in the search bar
  // fuseResult.length is the number of results from the search, 0 if the search bar is empty OR no results found
  dateAndIndexList.forEach(([date, rowTowerIndices]) => {
    let searchBarEmpty = filterText.length == 0;

    let towerIsInRow =
      fuseResult.length > 0 && rowTowerIndices.includes(fuseResult[0].refIndex);

    if (searchBarEmpty || towerIsInRow) {
      rows.push(
        <div className="mb-8" key={date}>
          <h2 className="p-2 text-2xl font-semibold">
            {date.format("dddd MMMM D h:mma")}
          </h2>

          <div className="flex flex-row justify-center space-x-3">
            {rowTowerIndices.map((index) => (
              <TowerCard
                key={index}
                towerFileName={TOWERS[index].towerFileName}
                towerEnglishName={TOWERS[index].towerEnglishName}
              />
            ))}
          </div>
        </div>,
      );
    }
  });

  return (
    <main className="flex max-w-[600px] flex-col items-center text-center">
      <h1 className="mb-8 text-5xl">
        BTD6 Collection Event
        <br />
        Calculator
      </h1>

      <div className="mb-8 flex flex-col items-center gap-7">
        <p>
          Timezone: {timezoneName} ({timezoneAbbreviation})
        </p>

        <input
          type="text"
          value={filterText}
          placeholder="Search tower..."
          onChange={(e) => setFilterText(e.target.value)}
          className="max-w-[250px] rounded-lg border border-gray-300 bg-gray-100 p-1 shadow dark:border-gray-700 dark:bg-gray-800"
        />
      </div>

      {rows}
    </main>
  );
}

export default App;
