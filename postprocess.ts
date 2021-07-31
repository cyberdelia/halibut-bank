import { readCSV, writeCSV } from 'https://deno.land/x/flat@0.0.11/mod.ts'

const filename = Deno.args[0]
const tsv = await readCSV(filename, {
  separator: ' ',
}) 
console.log(tsv)
