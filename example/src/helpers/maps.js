import * as d3 from 'd3';

const draw = (dataModule, svg, data, tooltipContainer) => {
  const mouseOver = (d) => {
    tooltipContainer.transition().duration(200).style('opacity', 0.9);

    tooltipContainer
      .html(getTooltipHtml(d.name, d.xKey, d[d.yKey]))
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY - 28 + 'px');
  };

  const mouseOut = () => {
    tooltipContainer.transition().duration(500).style('opacity', 0);
  };

  svg
    .selectAll('.' + dataModule)
    .data(data)
    .enter()
    .append('path')
    .attr('class', dataModule)
    .attr('d', (d) => d.path)
    .attr('fill', (d) => d.color || 'none')
    .on('mouseover', mouseOver)
    .on('mouseout', mouseOut);
};

const getTooltipHtml = (name, label, value) =>
  '<h4>' +
  name +
  '</h4><table><tr><td>' +
  label +
  '</td><td>' +
  value +
  '</td></tr></table>';

export default draw;
