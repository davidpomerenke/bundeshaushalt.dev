import axios from 'axios';
import { writeFileSync } from 'fs';
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
        return require(cache);
    } catch (e) {
        const data = await fetch(url);
        writeFileSync(cache, JSON.stringify(data, null, 2));
        return data;
    }
}

const data = await cachedFetch(url(23));
process.stdout.write(JSON.stringify(data, null, 2));
