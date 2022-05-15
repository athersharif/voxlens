import React, { Component } from 'react';
import shuffle from 'lodash/shuffle';
import { createChartJS, createD3, createGoogleCharts } from './helpers';
import data from './data';

import './Graph.css';

class Graph extends Component {
  componentDidMount() {
    this.createChart();
  }

  settings = {
    fillColor: 'steelblue',
    title: 'COVID-19 Cases per US State',
    xKey: 'state',
    yKey: 'cases',
  };

  createChart = () => {
    const { library } = this.props;
    const chartContainer = document.getElementById('chart');

    if (chartContainer) {
      chartContainer.innerHTML = '';

      const settings = {
        ...this.settings,
        data: shuffle(data),
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
        <h1>{this.settings.title}</h1>
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
