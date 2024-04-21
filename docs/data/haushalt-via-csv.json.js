// convert the csv downloads from bundeshaushalt.de to a hierarchical json format
// note that the csvs are broken and sometimes contain too many delimiters, which we just ignore here

import { cachedFetch } from './http.js'
import Papa from 'papaparse'
import fs from 'fs'
import { get } from 'http'

const csvPaths = {
    2024: 'https://www.bundeshaushalt.de/static/daten/2024/soll/HH_2024.csv',
    2023: 'https://www.bundeshaushalt.de/static/daten/2023/soll/HH_2023.csv',
    2022: 'https://www.bundeshaushalt.de/static/daten/2022/soll/hh_2022_utf8.csv',
    2021: 'https://www.bundeshaushalt.de/static/daten/2021/soll/hh_2021_n2_utf8.csv',
    2020: 'https://www.bundeshaushalt.de/static/daten/2020/soll/hh_2020_utf8.csv',
    2019: 'https://www.bundeshaushalt.de/static/daten/2019/soll/hh_2019_utf8.csv',
}

Array.prototype.unique = function () {
    return [...new Set(this)]
}
const sum = (a, b) => parseFloat(a || 0) + parseFloat(b || 0)

const getData = async year => {
    const csv = await cachedFetch(csvPaths[year])
    const data = Papa.parse(csv, { header: true }).data.filter(
        a =>
            a['einahmen-ausgaben']?.toUpperCase() === 'A' ||
            a['einnahmen-ausgaben']?.toUpperCase() === 'A'
    )
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
                                .map(a => a['soll'] || a['soll '])
                                .reduce(sum, 0) * 1000
                        }))
                }))
        }))
    return hierarchy
}

let dataAllYears = new Map()
for (const year in csvPaths) {
    dataAllYears.set(year, {
        name: `Bundeshaushalt ${year}`,
        children: await getData(year)
    })
}
dataAllYears = Object.fromEntries(dataAllYears)

process.stdout.write(JSON.stringify(dataAllYears, null, 2))
// fs.writeFileSync(
//     './docs/.observablehq/cache/data/haushalt-via-csv.json',
//     JSON.stringify(dataAllYears, null, 2)
// )
