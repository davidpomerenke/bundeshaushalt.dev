import * as d3 from 'd3'

export const hierarchy = data => d3
    .hierarchy(data)
    .eachAfter(node => {
        node.value = node.data.value
    })
    .sort((a, b) => b.value - a.value)

// Formatting utilities.
export const format = d3.format(',d')
export const formatPercent = a => (
    a === 'new'
        ? 'new'
        : d3.format('+.1%')(a - 1))
export const name = d => d
    .ancestors()
    .reverse()
    .map(d => d.data.name)
    .join('/')

const log2 = x => Math.log(x) / Math.log(2)

export const color = (d, showChanges) => showChanges
    ? d.data.change === 'new'
        ? 'yellow'
        : d3.scaleSequential([3, -3], d3.interpolateRdBu)(log2(d.data.change))
    : d3.scaleSequential([8, 0], d3.interpolateMagma)(d.height)
