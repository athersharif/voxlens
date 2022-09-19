import React, { Component } from 'react';
import shuffle from 'lodash/shuffle';
import { createChartJS, createD3, createGoogleCharts } from './helpers';

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
    const { combination } = this.props;
    const chartContainer = document.getElementById('chart');

    if (chartContainer) {
      chartContainer.innerHTML = '';

      const settings = {
        ...this.settings,
        chartType: combination.type,
        dataModule: combination.type === 'map' ? 'state' : null,
        data: shuffle(require('./data/' + combination.type)),
      };

      let func = null;

      if (combination.library === 'chartjs') func = createChartJS;
      else if (combination.library === 'd3') func = createD3;
      else if (combination.library === 'googlecharts')
        func = createGoogleCharts;

      return func ? func(settings) : null;
    } else {
      this.createChart();
    }
  };

  render() {
    const { combination } = this.props;

    return (
      <div id="graph">
        {combination.library === 'd3' && <h1>{this.settings.title}</h1>}
        {combination.library === 'chartjs' ? (
          <canvas id="chart" tabIndex="0" role="img" />
        ) : (
          <div id="chart" />
        )}
      </div>
    );
  }
}

export default Graph;
