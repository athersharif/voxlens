import { Switch, Route } from 'react-router';
import Home from './Home';
import Graph from './Graph';

const renderComponent = (appProps, props, library) =>
  appProps.supportedLibraries.includes(library) ? (
    <Graph {...appProps} {...props} library={library} />
  ) : (
    <div>Supported libraries: {appProps.supportedLibraries.join(', ')}</div>
  );

const Routes = (appProps) => (
  <Switch>
    <Route exact path='/' component={Home} />
    {appProps.supportedLibraries.map((library) => (
      <Route
        key={library}
        exact
        path={'/' + library}
        render={(props) => renderComponent(appProps, props, library)}
      />
    ))}
  </Switch>
);

export default Routes;
