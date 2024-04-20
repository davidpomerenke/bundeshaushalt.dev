import { cachedFetch } from './http.js'
import Papa from 'papaparse'
import fs from 'fs'

const csv = await cachedFetch(
    'https://www.bundeshaushalt.de/static/daten/2024/soll/HH_2024.csv'
)
const data = Papa.parse(csv, { header: true }).data
    .filter(a => a['einahmen-ausgaben'] === "A") // sic! 

Array.prototype.unique = function () {
    return [...new Set(this)]
}
const sum = (a, b) => parseFloat(a) + parseFloat(b)

const hierarchy = data
    .map(a => a['einzelplan-text'])
    .unique()
    .filter(a => a !== undefined)
    .map(einzelplan => ({
        name: einzelplan,
        children: data
            .filter(a => a['einzelplan-text'] === einzelplan)
            .map(a => a['kapitel-text'])
            .unique()
            .map(kapitel => ({
                name: kapitel,
                children: data
                    .filter(
                        a =>
                            a['einzelplan-text'] === einzelplan &&
                            a['kapitel-text'] === kapitel
                    )
                    .map(a => a['titel-text'])
                    .unique()
                    .map(titel => ({
                        name: titel,
                        value: data
                            .filter(
                                a =>
                                    a['einzelplan-text'] === einzelplan &&
                                    a['kapitel-text'] === kapitel &&
                                    a['titel-text'] === titel
                            )
                            .map(a => a['soll ']) // sic!
                            .reduce(sum, 0)
                    }))
            }))
    }))
const json = {
    name: 'Bundeshaushalt 2024',
    children: hierarchy
}

process.stdout.write(JSON.stringify(json, null, 2))
// fs.writeFileSync('./docs/.observablehq/cache/data/haushalt-via-csv.json', JSON.stringify(json, null, 2));
