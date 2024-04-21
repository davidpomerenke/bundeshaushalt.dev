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
const vis = view(Inputs.select(['nested treemap', 'zoomable treemap']))
const year = view(Inputs.range([2019, 2024], {step:1, value: 2024}));
```

```js
const selectedData = data[year]
if (vis === "zoomable treemap") display(makeTreemapZoomable(selectedData))
else display(makeTreemapNested(selectedData))
```

## open data 🔓

- [use the public api](https://github.com/bundesAPI/bundeshaushalt-api)
- [download json data](https://github.com/davidpomerenke/bundeshaushalt.dev/tree/gh-pages/dist/_file/data) (simplified and consistent)
- [download csv and xml data](https://www.bundeshaushalt.de/DE/Download-Portal/download-portal.html) (with more metadata, not fully consistent)

## sister projects

- [bundeshaushalt.de](https://www.bundeshaushalt.de/DE/Bundeshaushalt-digital/bundeshaushalt-digital.html) 👋
- [the italian budget](https://budget.g0v.it/) 🇮🇹
