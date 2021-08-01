import { readCSV, writeCSV } from "https://deno.land/x/flat@0.0.11/mod.ts";

const filename = Deno.args[0];

const tsv = await readCSV(filename, {
  separator: " ",
  trimLeadingSpace: true,
});
tsv.shift();
const waves = tsv.filter(function (row) {
  return row["WVHT"] != "MM";
});

writeCSV("buoy.csv", waves);

const swell = waves.filter(function (row) {
  return (row["WDIR"] as number) >= 225 && (row["WVHT"] as number) >= 0.8;
});
if (swell.length > 0) {
  console.log(swell);
}
