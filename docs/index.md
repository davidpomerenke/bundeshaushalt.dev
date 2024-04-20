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
```

```js
if (vis === "nested treemap") display(makeTreemapNested(data))
else display(makeTreemapZoomable(data))
```

## open data 🔓

- [use our public api](https://github.com/bundesAPI/bundeshaushalt-api)
- [download json data dump](./_file/data/haushalt-via-csv.json)

## legacy website

this website is currently still in development.

you can find more information on our legacy website [bundeshaushalt.de](https://bundeshaushalt.de), including some [beautiful pie charts](https://www.bundeshaushalt.de/DE/Bundeshaushalt-digital/bundeshaushalt-digital.html) and some relatively consistent [csv and xml downloads](https://www.bundeshaushalt.de/DE/Download-Portal/download-portal.html).