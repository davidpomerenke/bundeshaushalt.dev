---
theme: dashboard
title: ''
toc: false
style: style.css
---

# bundeshaushalt.dev 🇩🇪💰

```js
import { makeTreemapNested } from './components/treemap-nested.js'
import { makeTreemapZoomable } from './components/treemap-zoomable.js'

const data = FileAttachment('./data/haushalt-via-csv.json').json()
const vis = view(Inputs.select(['zoomable treemap', 'nested treemap']))
const year = view(Inputs.range([2019, 2024], {step:1, value: 2024}));
```

```js
const selectedData = data[year]
if (vis === "zoomable treemap") display(makeTreemapZoomable(selectedData))
else display(makeTreemapNested(selectedData))
```

## open data 🔓

- [use the public api](https://github.com/bundesAPI/bundeshaushalt-api)
- [download json data dump](https://github.com/davidpomerenke/bundeshaushalt.dev/tree/gh-pages/dist/_file/data)

## legacy website

this website is currently still in development.

you can find more information on our legacy website [bundeshaushalt.de](https://bundeshaushalt.de), including some [beautiful pie charts](https://www.bundeshaushalt.de/DE/Bundeshaushalt-digital/bundeshaushalt-digital.html) and some relatively consistent [csv and xml downloads](https://www.bundeshaushalt.de/DE/Download-Portal/download-portal.html).