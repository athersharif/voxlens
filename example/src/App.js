import { HashRouter as Router } from 'react-router-dom';
import Routes from './Routes';

import './App.css';

const supportedLibraries = ['chartjs', 'd3', 'googlecharts'];
const supportedTypes = ['bar', 'scatter', 'line', 'map'];

const App = () => (
  <Router>
    <Routes
      supportedLibraries={supportedLibraries}
      supportedTypes={supportedTypes}
    />
  </Router>
);

export default App;
