import React from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = '/voxlens/playground';

const Home = () => (
  <div>
    <h1>Examples</h1>
    <ul>
      <li><Link to="/chartjs">ChartJS</Link></li>
      <li><Link to="/d3">D3</Link></li>
      <li><Link to="/googlecharts">Google Charts</Link></li>
    </ul>
  </div>
);

export default Home;
