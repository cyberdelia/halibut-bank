import { readCSV, writeCSV } from 'https://deno.land/x/flat@0.0.11/mod.ts'

const tsv = await readCSV('buoy.tsv')
