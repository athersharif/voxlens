import Chart from 'chart.js';
import startCase from 'lodash/startCase';
import voxlens from '../../../dist';

const createChartJS = (options) => {
  const { data, fillColor, title, xKey, yKey } = options;

  const container = document.getElementById('chart');
  const margin = { top: 20, right: 40, bottom: 40, left: 70 };
  const height = container.height - margin.top - margin.bottom;
  const width = container.width - margin.left - margin.right;

  const ctx = container.getContext('2d');
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  const mappedData = data.map((d) => d[yKey]);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map((d) => d[xKey]),
      datasets: [
        {
          label: startCase(yKey),
          data: mappedData,
          fill: true,
          backgroundColor: fillColor,
          borderColor: fillColor,
        },
      ],
    },
    options: {
      maintainAspectRatio: true,
      title: {
        display: true,
        text: title,
      },
      legend: false,
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: startCase(xKey),
            },
            gridLines: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: startCase(yKey),
            },
            gridLines: {
              display: true,
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  const voxlensOptions = {
    x: xKey,
    y: yKey,
    title,
  };

  voxlens('chartjs', container, data, voxlensOptions);
};

export default createChartJS;
