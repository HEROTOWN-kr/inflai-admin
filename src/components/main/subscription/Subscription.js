import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SubscriptionList from './SubscriptionList';
import SubscriptionDetail from './SubscriptionDetail';

function Subscription(props) {
  const { match, setMenuIndicator } = props;
  useEffect(() => setMenuIndicator(5), []);

  return (
    <Switch>
      <Route
        exact
        path={`${match.path}/List`}
        render={renderProps => (<SubscriptionList {...props} />)}
      />
      <Route
        exact
        path={`${match.path}/:id`}
        render={renderProps => <SubscriptionDetail {...renderProps} />}
      />
      <Route
        exact
        path={`${match.path}/`}
        render={() => (
          <Redirect to={`${match.path}/List`} />
        )}
      />
    </Switch>
  );
}

export default Subscription;
