// connect to the bundeshaushalt.de API and download the hierarchical data bit by bit
// this is a lot of effort and only recommended for analyzing smaller parts of the budget
// this project instead relies on the csv files, see haushalt-via-csv.json.js

import { cachedFetch } from './http.js'

const url = id =>
    `https://www.bundeshaushalt.de/internalapi/budgetData?year=2024&quota=target&account=expenses&unit=single&id=${id}`

const loadData = async id => {
    const data = await cachedFetch(url(id))
    delete data.meta
    delete data.parents
    delete data.related // TODO: this actually contains additional information about the hierarchy that should be integrated!
    data.name = data.detail.label
    data.value_sum = data.detail.value
    delete data.detail
    if (!data.children) {
        // we only want the "data" field at the lowest level
        data.value = data.value_sum
    } else {
        for (const i in data.children) {
            data.children[i] = await loadData(data.children[i].id)
        }
    }
    return data
}

const data = await loadData(23)
process.stdout.write(JSON.stringify(data, null, 2))
// fs.writeFileSync('./docs/.observablehq/cache/data/haushalt.json', JSON.stringify(data, null, 2));
