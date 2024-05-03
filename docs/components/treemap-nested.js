// adapted from https://observablehq.com/@d3/nested-treemap
// ISC License (c) Mike Bostock

import { uid } from './uid.js'
import * as d3 from 'd3'
import { hierarchy, format, formatPercent, name, color } from './shared.js'

export function makeTreemapNested(data, showChanges = false) {
    // Specify the chart’s dimensions.
    const width = 928
    const height = 1060



    // Create the treemap layout.
    const treemap = data =>
        d3
            .treemap()
            .size([width, height])
            .paddingOuter(3)
            .paddingTop(19)
            .paddingInner(1)
            .round(true)(hierarchy(data))
    const root = treemap(data)

    // Create the SVG container.
    const svg = d3
        .create('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr(
            'style',
            'max-width: 100%; height: auto; overflow: visible; font: 10px sans-serif;'
        )

    const shadow = uid('shadow')

    svg
        .append('filter')
        .attr('id', shadow.id)
        .append('feDropShadow')
        .attr('flood-opacity', 0.3)
        .attr('dx', 0)
        .attr('stdDeviation', 3)

    const node = svg
        .selectAll('g')
        .data(d3.group(root, d => d.height))
        .join('g')
        .attr('filter', shadow)
        .selectAll('g')
        .data(d => d[1])
        .join('g')
        .attr('transform', d => `translate(${d.x0},${d.y0})`)



    node.append('title').text(
        d => `${name(d)}\n${format(d.value)}\n${formatPercent(d.data.change)}`
    )

    node
        .append('rect')
        .attr('id', d => (d.nodeUid = uid('node')).id)
        .attr('fill', d => color(d, showChanges))
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)

    node
        .append('clipPath')
        .attr('id', d => (d.clipUid = uid('clip')).id)
        .append('use')
        .attr('xlink:href', d => d.nodeUid.href)

    node
        .append('text')
        .attr('clip-path', d => d.clipUid)
        .selectAll('tspan')
        .data(d =>
            d.data.name
                .split(/(?=[A-Z][^A-Z])/g)
                .concat(format(d.value))
                .concat(formatPercent(d.data.change))
        )
        .join('tspan')
        .attr('fill-opacity', (d, i, nodes) => (i >= nodes.length - 2 ? 0.7 : null))
        .text(d => d)

    node
        .filter(d => d.children)
        .selectAll('tspan')
        .attr('dx', 3)
        .attr('y', 13)

    node
        .filter(d => !d.children)
        .selectAll('tspan')
        .attr('x', 3)
        .attr(
            'y',
            (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`
        )

    return svg.node()
}
