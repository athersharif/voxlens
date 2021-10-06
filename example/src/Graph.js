import React, { Component } from 'react';
import { createChartJS, createD3, createGoogleCharts } from './helpers';
import data from './data';

import './Graph.css';

class Graph extends Component {
  componentDidMount() {
    this.createChart();
  }

  createChart = () => {
    const { library } = this.props;
    const chartContainer = document.getElementById('chart');

    if (chartContainer) {
      chartContainer.innerHTML = '';

      const settings = {
        data,
        fillColor: 'steelblue',
        title: 'Price by Car Brands',
        xKey: 'car_brands',
        yKey: 'price',
      };

      let func = null;

      if (library === 'chartjs') func = createChartJS;
      else if (library === 'd3') func = createD3;
      else if (library === 'googlecharts') func = createGoogleCharts;

      return func ? func(settings) : null;
    } else {
      this.createChart();
    }
  };

  render() {
    const { library } = this.props;

    return (
      <div id="graph">
        <h1>Visualization for Price by Car Brands</h1>
        {library === 'chartjs' ? (
          <canvas id="chart" tabIndex="0" role="img" />
        ) : (
          <div id="chart" />
        )}
      </div>
    );
  }
}

export default Graph;
