import axios from 'axios';
import fs from "fs";
import "dotenv/config";
const apikey = process.env.ZENROWS_API_KEY;


const url = id => `https://www.bundeshaushalt.de/internalapi/budgetData?year=2024&quota=target&account=expenses&unit=single&id=${id}`;
const fetch = url => axios({
    url: 'https://api.zenrows.com/v1/',
    method: 'GET',
    params: {
        'url': url,
        'apikey': apikey,
    },
})
    .then(response => response.data)
    .catch(error => console.error(error));

const cachedFetch = async (url) => {
    const cache = `./cache/${url.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
    try {
        const text = fs.readFileSync(cache, 'utf8');
        return JSON.parse(text);
    } catch (e) {
        console.log(`fetching ${url}`)
        const data = await fetch(url);
        fs.writeFileSync(cache, JSON.stringify(data, null, 2));
        return data;
    }
}

const loadData = async (id) => {
    const data = await cachedFetch(url(id));
    delete data.meta;
    delete data.parents;
    delete data.related; // TODO: this actually contains additional information about the hierarchy that should be integrated!
    data.name = data.detail.label;
    data.value_sum = data.detail.value;
    delete data.detail;
    if (!data.children) {
        // we only want the "data" field at the lowest level
        data.value = data.value_sum;
    } else {
        for (const i in data.children) {
            data.children[i] = await loadData(data.children[i].id);
        }
    }
    return data;
}

const data = await loadData(23);
process.stdout.write(JSON.stringify(data, null, 2));
// fs.writeFileSync('./docs/.observablehq/cache/data/haushalt.json', JSON.stringify(data, null, 2));
