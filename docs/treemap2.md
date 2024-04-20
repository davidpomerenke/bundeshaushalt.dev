---
theme: dashboard
title: visual 2
toc: false
---

```js
const data = FileAttachment('./data/haushalt-via-csv.json').json()
```

```js
import { makeTreemapZoomed } from './components/treemap-zoomed.js'
const node = makeTreemapZoomed(data)
display(node)
```
