import startCase from 'lodash/startCase';
import voxlens from '../../../src';

const createGoogleCharts = (options) => {
  let { data, fillColor, title, xKey, yKey } = options;

  const container = document.getElementById('chart');
  const margin = { top: 20, right: 40, bottom: 20, left: 70 };
  const height = 700 - margin.top - margin.bottom;
  const width = container.offsetWidth - margin.left - margin.right;
  const google = window.google;

  const drawChart = () => {
    const dataTable = new google.visualization.DataTable();

    let Chart = google.visualization.ColumnChart;

    dataTable.addColumn('string', startCase(xKey));
    dataTable.addColumn('number', startCase(yKey));
    dataTable.addRows(
      data.map((d) => [d[xKey].toString(), parseFloat(d[yKey])])
    );

    const options = {
      legend: { position: 'none' },
      bars: 'horizontal',
      colors: [fillColor],
      title,
      width,
      height,
      hAxis: {
        title: startCase(xKey),
        slantedText: false,
      },
      vAxis: {
        title: startCase(yKey),
        baseline: 0,
        gridlines: {
          color: 'black',
        },
      },
    };

    const chart = new Chart(container);

    chart.draw(dataTable, options);

    const voxlensOptions = {
      x: xKey,
      y: yKey,
      title,
    };

    voxlens('googlecharts', chart, data, voxlensOptions);
  };

  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);
};

export default createGoogleCharts;
