// fetch https://www.bundeshaushalt.de/static/daten/2024/soll/haushalt_2024.xml
// and read the XML file

import xml2js from "xml2js";
import { cachedFetch } from "./http.js";
import fs from "fs";

const xml = await cachedFetch("https://www.bundeshaushalt.de/static/daten/2024/soll/haushalt_2024.xml", false);
const json = (await xml2js.parseStringPromise(xml))["haushalt"]["einzelplan"];

const bmz = json.find(a => a["$"]["nr"] === "23");
const data = json.map(a => ({
    "name": a["text"],
    "children": a["kapitel"].map(b => ({
        "name": b["text"],
        "children": b["ausgaben"]?.map(c => [
            ...Object.keys(c)
            // ["titel"].map(d => ({
            //     "name": d["text"],
            //     "value": d["soll"]["$"]["wert"],
            // })),
            // ...c["titelgruppe"],
        ])
    }))
}));


fs.writeFileSync('./docs/.observablehq/cache/data/haushalt-via-xml.json', JSON.stringify(bmz, null, 2));
fs.writeFileSync('./docs/.observablehq/cache/data/haushalt-via-xml-data.json', JSON.stringify(data, null, 2));
