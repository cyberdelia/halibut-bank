import { readCSV, writeCSV } from "https://deno.land/x/flat@0.0.11/mod.ts";

const filename = Deno.args[0];

const tsv = await readCSV(filename, {
  separator: " ",
  skipFirstRow: true,
  trimLeadingSpace: true,
  parse: (row: any) => {
    return {
      date: `${row["#YY"]}-${row["MM"]}-${row["DD"]}T${row["hh"]}:${
        row["mm"]
      }:00Z`,
      "wind direction": row["WDIR"],
      "wind speed": row["WSPD"],
      "gust speed": row["GST"],
      "wave height": row["WVHT"],
      "dominant wave period": row["DPD"],
    };
  },
});

tsv.shift();

writeCSV(
  "buoy.csv",
  tsv.filter((row) => {
    return row["wave height"] != "MM";
  }),
);
