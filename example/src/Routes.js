import { Switch, Route } from 'react-router';
import Home from './Home';
import Graph from './Graph';

const renderComponent = (appProps, props, combination) => {
  if (!appProps.supportedLibraries.includes(combination.library)) {
    return (
      <div>Supported libraries: {appProps.supportedLibraries.join(', ')}</div>
    );
  } else if (!appProps.supportedTypes.includes(combination.type)) {
    return <div>Supported types: {appProps.supportedTypes.join(', ')}</div>;
  } else {
    return <Graph {...appProps} {...props} combination={combination} />;
  }
};

const Routes = (appProps) => {
  let combinations = [];

  appProps.supportedLibraries.forEach((library) => {
    appProps.supportedTypes.forEach((type) => {
      combinations.push({ library, type });
    });
  });

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      {combinations.map((combination) => (
        <Route
          key={combination.library + '-' + combination.type}
          exact
          path={'/' + combination.library + '/' + combination.type}
          render={(props) => renderComponent(appProps, props, combination)}
        />
      ))}
    </Switch>
  );
};

export default Routes;
