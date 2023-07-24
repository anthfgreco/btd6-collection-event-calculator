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

// American Independence Day Event (event finished)
// Ends July 24th 8pm NZST or July 24th 4am EST
//
// let startDate = dayjs.tz(new Date(2023, 6, 10, 12), "America/Toronto");
// let startingIndex = 7;
// let endDate = dayjs.tz(new Date(2023, 6, 24, 4), "America/Toronto");

// Fake times for debugging/demo
let startDate = dayjs().set("hour", 0).set("minute", 0);
let startingIndex = 0;
let endDate = startDate.add(15, "days");

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
        <div className="mb-6" key={date}>
          <h2 className="m-2 text-xl font-semibold">
            {date.format("dddd MMMM D h:mma")}
          </h2>

          <div className="mx-6 grid grid-cols-2 gap-3 md:flex">
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
    <main className="my-4 flex max-w-[600px] flex-col text-center">
      <h1 className="mb-12 font-luckiest-guy text-5xl">
        BTD6 Collection Event
        <br />
        Calculator
      </h1>

      <div className="mx-4 mb-12 flex flex-col items-center gap-4">
        <p>
          Time Zone:{" "}
          <span className="font-semibold">
            {timezoneName} ({timezoneAbbreviation})
          </span>
        </p>

        <input
          type="text"
          value={filterText}
          placeholder="Search tower..."
          onChange={(e) => setFilterText(e.target.value)}
          className="max-w-[200px] rounded-lg border border-gray-300 bg-gray-100 p-1 shadow"
        />
      </div>

      {rows}
    </main>
  );
}

export default App;
