import 'dotenv/config'
const apikey = process.env.ZENROWS_API_KEY
import axios from 'axios'
import fs from 'fs'

const fetchWithProxy = url =>
    axios({
        url: 'https://api.zenrows.com/v1/',
        method: 'GET',
        params: {
            url: url,
            apikey: apikey
        }
    })
        .then(response => response.data)
        .catch(error => console.error(error))

const cachedFetch = async (url, withProxy = true) => {
    if (!fs.existsSync('./cache')) fs.mkdirSync('./cache')
    const cache = `./cache/${url.replace(/[^a-zA-Z0-9]/g, '_')}.json`
    try {
        const text = fs.readFileSync(cache, 'utf8')
        return JSON.parse(text)
    } catch (e) {
        const data = await (withProxy
            ? fetchWithProxy(url)
            : axios.get(url).then(response => response.data))
        fs.writeFileSync(cache, JSON.stringify(data, null, 2))
        return data
    }
}

export { cachedFetch }