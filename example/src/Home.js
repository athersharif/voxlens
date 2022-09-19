import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Examples</h1>
    <h2>Visualization Libraries</h2>
    <ul>
      <li>
        <Link to="/chartjs/bar">ChartJS</Link>
      </li>
      <li>
        <Link to="/d3/bar">D3</Link>
      </li>
      <li>
        <Link to="/googlecharts/bar">Google Charts</Link>
      </li>
    </ul>
    <h2>Chart Types</h2>
    <ul>
      <li>
        <Link to="/d3/bar">Single-series Bar Graph</Link>
      </li>
      <li>
        <Link to="/d3/map">Geospatial Map</Link>
      </li>
    </ul>
  </div>
);

export default Home;
