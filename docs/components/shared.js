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
    ? d.data.change
        ? d.data.change === 'new'
            ? 'lightgreen'
            : d.data.change < 0
                ? "violet" // this is a weird case where the cost has switched from negative to positive or vice versa
                : d3.scaleSequential([4, -4], d3.interpolateRdBu)(log2(d.data.change))
        : "white"
    : d3.scaleSequential([8, 0], d3.interpolateMagma)(d.height)


const luminance = color_ => {
    const rgb = d3.color(color_);
    return (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
}

export const textColor = backgroundColor => luminance(backgroundColor) > 0.5 ? 'black' : 'white';  