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

  multiSeriesSettings = {
    title: 'Olympic medals over the years for top 10 countries',
    xKey: ['year', 'country'],
    yKey: 'medal_count',
  };

  createChart = () => {
    const { combination } = this.props;
    const chartContainer = document.getElementById('chart');

    if (chartContainer) {
      chartContainer.innerHTML = '';

      const data = require('./data/' + combination.type);

      const settings = {
        ...(combination.type === 'multiseries'
          ? this.multiSeriesSettings
          : this.settings),
        chartType: combination.type,
        dataModule: combination.type === 'map' ? 'state' : null,
        data: combination.type === 'multiseries' ? data : shuffle(data),
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
    const settings =
      combination.type === 'multiseries'
        ? this.multiSeriesSettings
        : this.settings;

    return (
      <div id="graph">
        {combination.library === 'd3' && <h1>{settings.title}</h1>}
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
