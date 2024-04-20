---
theme: dashboard
title: visual 1
toc: false
---

```js
const data = FileAttachment('./data/haushalt-via-csv.json').json()
```

```js
import {makeTreemapNested} from "./components/treemap-nested.js"
const node = makeTreemapNested(data)
display(node)
```
