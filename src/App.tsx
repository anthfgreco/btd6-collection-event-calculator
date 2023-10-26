import dayjs from "dayjs";
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

// Determine the user's timezone
let timezoneName = dayjs.tz.guess();
let timezoneAbbreviation = dayjs().tz(timezoneName).format("zzz");

/*
American Independence Day Event (event finished)
Ends July 24th 8pm NZST or July 24th 4am EST

let startDate = dayjs.tz(new Date(2023, 6, 10, 12), "America/Toronto");
let startingIndex = 7;
let endDate = dayjs.tz(new Date(2023, 6, 24, 4), "America/Toronto");
*/

// Fake times for debugging/demo
// let startDate = dayjs().set("hour", 0).set("minute", 0);
// let startingIndex = 0;
// let endDate = startDate.add(15, "days");

// Halloween Event
// Started October 25th 8pm EDT
// Ends November 9th 12am EST
let startDate = dayjs.tz(new Date(2023, 10, 25, 20), "America/Toronto");
let startingIndex = 0;
let endDate = dayjs.tz(new Date(2023, 11, 9, 0), "America/Toronto");

/**
 * Each date represents when the next tower rotation will occur
 */
let startToEndDateList: dayjs.Dayjs[] = [];

/**
 * List of integer indices representing tower rotations
 * Each inner array has 4 integer indices pointing to which tower is currently in rotation
 */
let indexList: [number, number, number, number][] = [];

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

/**
 * A Fuse instance for fuzzy searching tower data.
 */
const fuse = new Fuse(TOWERS, {
  keys: ["towerEnglishName", "aliases"],
});

function App() {
  const [searchBarText, setSearchBarText] = useState("");

  let fuseResult = fuse.search(searchBarText, { limit: 1 });

  let now = dayjs();
  // We want the current rotation to display
  let nowMinus8Hours = now.subtract(8, "hour");

  /**
   * An array to store date and tower rotation information based on the current time and user's timezone.
   * Each inner array contains the timezone-converted date and the corresponding 4 tower indices.
   */
  let dateAndIndexList: [dayjs.Dayjs, [number, number, number, number]][] = [];

  for (let i = 0; i < startToEndDateList.length; i++) {
    if (startToEndDateList[i].isAfter(nowMinus8Hours)) {
      let timezoneConvertedDate = startToEndDateList[i].tz(timezoneName);
      let towerIndices: [number, number, number, number] = indexList[i];

      dateAndIndexList.push([timezoneConvertedDate, towerIndices]);
    }
  }

  const rows: JSX.Element[] = [];

  // Loops through dateAndIndexList to generate JSX elements to render rows
  // If the search bar is empty, display all rows
  // If the search bar is not empty, search for a tower using fuse and display only rows containing that tower
  dateAndIndexList.forEach(([date, rowTowerIndices]) => {
    let searchBarEmpty = searchBarText.length == 0;

    let towerIsInRow =
      fuseResult.length > 0 && rowTowerIndices.includes(fuseResult[0].refIndex);

    if (searchBarEmpty || towerIsInRow) {
      rows.push(
        <div className="mb-6" key={date.toString()}>
          <h2 className="m-2 text-xl font-semibold">
            {date.format("dddd MMMM D h:mma")}
          </h2>

          <div className="mx-6 grid grid-cols-2 gap-3 md:flex">
            {rowTowerIndices.map((index: number) => (
              <TowerCard
                key={index}
                towerFileName={TOWERS[index].towerFileName}
                towerEnglishName={TOWERS[index].towerEnglishName}
              />
            ))}
          </div>
        </div>
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
          value={searchBarText}
          placeholder="Search for tower..."
          onChange={(e) => setSearchBarText(e.target.value)}
          className="max-w-[300px] rounded-lg border border-gray-300 bg-gray-100 p-2 shadow"
        />
      </div>

      {rows}
    </main>
  );
}

export default App;
