import { readCSV, writeCSV } from "https://deno.land/x/flat@0.0.11/mod.ts";
const filename = Deno.args[0];

const header = [
  "year",
  "month",
  "day",
  "hour",
  "minutes",
  "wind direction",
  "wind speed",
  "gust speed",
  "wave height",
  "dominant wave period",
  "average wave period",
  "wave direction",
  "pressure",
  "air temperature",
  "sea temperature",
  "dewpoint",
  "visibility",
  "pressure tendency",
  "tide",
];

const columns = [
  "average wave period",
  "wave direction",
  "pressure",
  "air temperature",
  "sea temperature",
  "dewpoint",
  "visibility",
  "pressure tendency",
  "tide",
];

const tsv = await readCSV(filename, {
  separator: " ",
  trimLeadingSpace: true,
  columns: header,
});

tsv.shift();

const waves = tsv.filter((row) => {
  return row["wave height"] != "MM";
}).map((row: any) => {
  columns.forEach((column: string) => delete row[column]);
  return row;
});

writeCSV("buoy.csv", waves);
