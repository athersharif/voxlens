import * as d3 from 'd3';
import max from 'lodash/max';
import startCase from 'lodash/startCase';
import voxlens from '../../../dist';

const createD3 = (options) => {
  const { data, fillColor, title, xKey, yKey } = options;

  const container = document.getElementById('chart');
  const maxXLabel = max(data.map((d) => d[xKey].toString().length));
  const margin = { top: 20, right: 40, bottom: maxXLabel * 5 + 10, left: 70 };
  const height = 500 - margin.top - 20;
  const width = container.offsetWidth - margin.left - margin.right;
  const transform = margin.left + ',' + margin.top;

  const svg = d3
    .select('#chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + 40 + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + transform + ')');

  let x = null;

  const y = d3.scaleLinear().range([height, 0]);

  const voxlensOptions = {
    x: xKey,
    y: yKey,
    title,
  };

  x = d3.scaleBand().range([0, width]).padding(0.1);
  x.domain(data.map((d) => d[xKey]));
  y.domain([0, d3.max(data, (d) => parseFloat(d[yKey]))]);

  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', -7)
    .style('text-anchor', 'middle')
    .text(title);

  svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .style('fill', fillColor)
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
};

export default createD3;
