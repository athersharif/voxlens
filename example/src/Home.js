import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Examples</h1>
    <h2>Visualization Libraries</h2>
    <ul>
      <li>
        ChartJS <Link to="/chartjs/bar">(With VoxLens</Link>
        {' | '}
        <Link to="/chartjs/bar/inaccessible">Without VoxLens)</Link>
      </li>
      <li>
        D3 <Link to="/d3/bar">(With VoxLens</Link>
        {' | '}
        <Link to="/d3/bar/inaccessible">Without VoxLens)</Link>
      </li>
      <li>
        Google Charts <Link to="/googlecharts/bar">(With VoxLens</Link>
        {' | '}
        <Link to="/googlecharts/bar/inaccessible">Without VoxLens)</Link>
      </li>
    </ul>
    <h2>Chart Types</h2>
    <ul>
      <li>
        Single-series Bar Graph <Link to="/d3/bar">(With VoxLens</Link>
        {' | '}
        <Link to="/d3/bar/inaccessible">Without VoxLens)</Link>
      </li>
      <li>
        Multi-series Line Graph <Link to="/d3/multiseries">(With VoxLens</Link>
        {' | '}
        <Link to="/d3/multiseries/inaccessible">Without VoxLens)</Link>
      </li>
      <li>
        Geospatial Map <Link to="/d3/map">(With VoxLens</Link>
        {' | '}
        <Link to="/d3/map/inaccessible">Without VoxLens)</Link>
      </li>
    </ul>
  </div>
);

export default Home;
