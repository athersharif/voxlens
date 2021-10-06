import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

import './App.css';

const supportedLibraries = ['chartjs', 'd3', 'googlecharts'];

const App = () => (
  <Router>
    <Routes supportedLibraries={supportedLibraries} />
  </Router>
);

export default App;
