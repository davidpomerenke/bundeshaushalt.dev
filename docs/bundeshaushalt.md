---
theme: dashboard
title: Bundeshaushalt
toc: false
---

# Bundeshaushalt 🚀

<!-- Load and transform the data -->

```js
const data = FileAttachment("./data/haushalt.json").json();
```

<div class="card">
${JSON.stringify(data)}
</div>
