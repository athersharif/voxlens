import * as d3 from 'd3';
import max from 'lodash/max';
import startCase from 'lodash/startCase';
import drawMap from './maps';
import voxlens from '../../../src';

const createD3 = (options) => {
  let { chartType, data, dataModule, fillColor, title, xKey, yKey } = options;

  const getDimensions = (maxXLabel) => {
    const margin = { top: 20, right: 40, bottom: maxXLabel * 5 + 10, left: 70 };

    return {
      margin,
      height: 500 - margin.top - 20,
      width: container.offsetWidth - margin.left - margin.right,
    };
  };

  const container = document.getElementById('chart');

  if (chartType === 'bar') {
    let maxXLabel = max(data.map((d) => d[xKey].toString().length));
    let { height, margin, width } = getDimensions(maxXLabel);
    let transform = margin.left + ',' + margin.top;

    const voxlensOptions = {
      x: xKey,
      y: yKey,
      title,
      chartType,
      dataModule,
    };

    const svg = d3
      .select('#chart')
      .append('center')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + 40 + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + transform + ')');

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain(data.map((d) => d[xKey]));
    y.domain([0, d3.max(data, (d) => parseFloat(d[yKey]))]);

    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .style('fill', 'steelblue')
      .style('margin', '10px')
      .attr('x', (d) => x(d[xKey]))
      .attr('width', x.bandwidth())
      .attr('y', (d) => y(d[yKey]))
      .attr('height', (d) => height - y(d[yKey]))
      .call((d) => voxlens('d3', d, data, voxlensOptions));

    svg
      .append('text')
      .attr(
        'transform',
        'translate(' + width / 2 + ' ,' + (height + margin.bottom + 20) + ')'
      )
      .style('text-anchor', 'middle')
      .text(startCase(xKey));

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(startCase(yKey));

    svg
      .append('g')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(d3.axisBottom(x).ticks(data.length))
      .selectAll('text')
      .attr('y', 0)
      .attr('x', 9)
      .attr('dy', '.35em')
      .attr('transform', 'rotate(90)')
      .style('text-anchor', 'start')
      .style('opacity', 1);

    svg.append('g').call(d3.axisLeft(y));
  } else if (chartType === 'scatter') {
    let maxXLabel = max(data.map((d) => d[xKey].toString().length));
    let { height, margin, width } = getDimensions(maxXLabel);
    let transform = margin.left + ',' + margin.top;

    const voxlensOptions = {
      x: xKey,
      y: yKey,
      title,
      chartType,
      dataModule,
    };

    const svg = d3
      .select('#chart')
      .append('center')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + 40 + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + transform + ')');

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain([
      d3.min(data, (d) => parseFloat(d[xKey])),
      d3.max(data, (d) => parseFloat(d[xKey])),
    ]);
    y.domain([
      d3.min(data, (d) => parseFloat(d[yKey])),
      d3.max(data, (d) => parseFloat(d[yKey])),
    ]);

    svg
      .append('g')
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d[xKey]))
      .attr('cy', (d) => y(d[yKey]))
      .attr('r', 5)
      .style('fill', fillColor)
      .call((d) => voxlens('d3', d, data, voxlensOptions));

    svg
      .append('text')
      .attr(
        'transform',
        'translate(' + width / 2 + ' ,' + (height + margin.bottom + 20) + ')'
      )
      .style('text-anchor', 'middle')
      .text(startCase(xKey));

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(startCase(yKey));

    svg
      .append('g')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(d3.axisBottom(x).ticks(data.length).tickFormat(d3.format('d')))
      .selectAll('text')
      .attr('y', 0)
      .attr('x', 9)
      .attr('dy', '.35em')
      .attr('transform', 'rotate(90)')
      .style('text-anchor', 'start')
      .style('opacity', 1);

    svg
      .append('g')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(d3.axisBottom(x).ticks(data.length))
      .selectAll('text')
      .attr('y', 0)
      .attr('x', 9)
      .attr('dy', '.35em')
      .attr('transform', 'rotate(90)')
      .style('text-anchor', 'start')
      .style('opacity', 1);

    svg.append('g').call(d3.axisLeft(y));
  } else if (chartType === 'line') {
    let maxXLabel = max(data.map((d) => d[xKey].toString().length));
    let { height, margin, width } = getDimensions(maxXLabel);
    let transform = margin.left + ',' + margin.top;

    const voxlensOptions = {
      x: xKey,
      y: yKey,
      title,
      chartType,
      dataModule,
    };

    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + 40 + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + transform + ')');

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain(data.map((d) => d[xKey]));
    y.domain([
      d3.min(data, (d) => parseFloat(d[yKey])),
      d3.max(data, (d) => parseFloat(d[yKey])),
    ]);

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', fillColor)
      .attr('stroke-width', 3)
      .attr(
        'd',
        d3
          .line()
          .x((d) => x(d[xKey]) + x.bandwidth() / 2)
          .y((d) => y(d[yKey]))
      )
      .call((d) => voxlens('d3', d, data, voxlensOptions));

    svg
      .append('text')
      .attr(
        'transform',
        'translate(' + width / 2 + ' ,' + (height + margin.bottom + 20) + ')'
      )
      .style('text-anchor', 'middle')
      .text(startCase(xKey));

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(startCase(yKey));

    svg
      .append('g')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(d3.axisBottom(x).ticks(data.length))
      .selectAll('text')
      .attr('y', 0)
      .attr('x', 9)
      .attr('dy', '.35em')
      .attr('transform', 'rotate(90)')
      .style('text-anchor', 'start')
      .style('opacity', 1);

    svg.append('g').call(d3.axisLeft(y));
  } else if (chartType === 'pie') {
    let maxXLabel = 2;
    let { height, margin, width } = getDimensions(maxXLabel);
    let transform = width / 2 + ',' + height / 2;

    const voxlensOptions = {
      x: xKey,
      y: yKey,
      title,
      chartType,
      dataModule,
    };

    const svg = d3
      .select('#chart')
      .append('center')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + 40 + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + transform + ')');

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain(data.map((d) => d[xKey]));
    y.domain([0, d3.max(data, (d) => parseFloat(d[yKey]))]);

    const colors = d3
      .scaleOrdinal()
      .domain(data.map((d) => d[xKey]))
      .range(d3.schemeDark2);
    const radius = Math.min(width, height) / 2 - margin.left;
    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d[yKey]);

    svg
      .selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(radius))
      .attr('fill', (d) => colors(d.data[xKey]))
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .call((d) => voxlens('d3', d, data, voxlensOptions));

    const existingContainer = document.getElementById('d3-pie-legend');

    if (existingContainer) {
      existingContainer.innerHTML = '';
    }

    const legendContainer = d3
      .select('#d3-pie-legend')
      .append('svg')
      .attr('height', 18 * data.length);

    const legend = legendContainer
      .selectAll('.legend')
      .data(pie(data))
      .enter()
      .append('g')
      .attr(
        'transform',
        (d, i) => 'translate(' + 15 + ',' + (i * 15 + 20) + ')'
      )
      .attr('class', 'legend');

    legend
      .append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('y', -10)
      .attr('x', -15)
      .attr('fill', (d) => colors(d.data[xKey]));

    legend
      .append('text')
      .text((d) => d.data[xKey] + '(' + d.data[yKey] + ')')
      .style('font-size', 12)
      .attr('x', 0);

    svg
      .append('g')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(d3.axisBottom(x).ticks(data.length))
      .selectAll('text')
      .attr('y', 0)
      .attr('x', 9)
      .attr('dy', '.35em')
      .attr('transform', 'rotate(90)')
      .style('text-anchor', 'start')
      .style('opacity', 1);

    svg.append('g').call(d3.axisLeft(y));
  } else if (chartType === 'map') {
    let maxXLabel = 2;
    let { height, margin, width } = getDimensions(maxXLabel);
    let transform = margin.left + ',' + margin.top;

    const voxlensOptions = {
      x: xKey,
      y: yKey,
      title,
      chartType,
      dataModule,
    };

    const svg = d3
      .select('#chart')
      .append('center')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + 40 + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + transform + ')');

    const start = d3.max([1, d3.min(data, (d) => parseFloat(d[yKey]))]);
    const end = 1 + d3.max(data, (d) => parseFloat(d[yKey]));

    const logScale = d3.scaleLog().domain([start, end]);
    const colorScaleLog = d3.scaleSequential((d) =>
      d3.interpolateBlues(logScale(d))
    );

    const tooltipContainer = d3
      .select('#chart')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    const paths = require('./paths/' + dataModule + '.json');

    const mappedData = data.map((d) => {
      const name = d[xKey];
      const path = paths.find(
        (s) =>
          name.toLowerCase() === s.id.toLowerCase() ||
          name.toLowerCase() === s.name.toLowerCase() ||
          (s.alias && name.toLowerCase() === s.alias.toLowerCase())
      );
      const value = +d[yKey];

      if (!path) return null;

      return {
        id: path.id,
        name,
        [xKey]: name,
        [yKey]: value,
        path: path.d,
        color: colorScaleLog(value),
        xKey,
        yKey,
      };
    });

    drawMap(dataModule, svg, mappedData, tooltipContainer);

    const svgElement = document
      .getElementById('chart')
      .getElementsByTagName('svg')[0];
    const gElement = svgElement
      .getElementsByTagName('g')[0]
      .getBoundingClientRect();
    const widthDifference = (svgElement.clientWidth - gElement.width) / 2;

    d3.select('g').attr(
      'transform',
      'translate(' + widthDifference + ',' + margin.top + ') scale(0.85 0.85)'
    );

    svg
      .selectAll('.' + dataModule)
      .call((d) => voxlens('d3', d, data, voxlensOptions));
  }
};

export default createD3;
