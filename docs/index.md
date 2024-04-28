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
const year = view(Inputs.range([2019, 2024], { step: 1, value: 2024 }))
const showChanges = view(Inputs.checkbox(['Show change relative to last year']))

```

<!-- ```js
const getChildren = a =>
  new Set(
    a['children']
      .map(a => a.name) //.children.map(b => b.children.map(c => c.name)))
    //   .flat(2)
  )
const a = getChildren(data[2024])
const b = getChildren(data[2023])
// get intersection
function intersection(set1, set2) {
  return new Set([...set1].filter(x => set2.has(x)))
}
display(intersection(a, b))
// get difference
function difference(set1, set2) {
  return new Set([...set1].filter(x => !set2.has(x)))
}
display(difference(a, b))
display(difference(b, a))
``` -->

```js
const selectedData = data[year]
if (vis === 'zoomable treemap') display(makeTreemapZoomable(selectedData, showChanges.length))
else display(makeTreemapNested(selectedData, showChanges.length))
```

## open data 🔓

- [use the public api](https://github.com/bundesAPI/bundeshaushalt-api)
- [download json data](https://github.com/davidpomerenke/bundeshaushalt.dev/tree/gh-pages/dist/_file/data) (simplified and consistent)
- [download csv and xml data](https://www.bundeshaushalt.de/DE/Download-Portal/download-portal.html) (with more metadata, not fully consistent)

## sister projects

- [bundeshaushalt.de](https://www.bundeshaushalt.de/DE/Bundeshaushalt-digital/bundeshaushalt-digital.html) 👋
- [the italian budget](https://budget.g0v.it/) 🇮🇹
