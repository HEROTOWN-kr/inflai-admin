import React, { useEffect, useState } from 'react';
import {
  Route, Switch, Redirect, useRouteMatch
} from 'react-router-dom';
import KakaoNotify from './pages/KakaoNotify';
import NotFound from '../NotFound';

function Settings(props) {
  const match = useRouteMatch();
  const { setMenuIndicator } = props;

  useEffect(() => setMenuIndicator(6), []);

  return (
    <Switch>
      <Route
        path={`${match.url}/KakaoNotify`}
        render={renderProps => <KakaoNotify {...props} />}
      />
      <Route
        exact
        path={`${match.url}/`}
        render={() => (
          <Redirect to={`${match.url}/KakaoNotify`} />
        )}
      />
      <Route
        component={NotFound}
      />
    </Switch>
  );
}

export default Settings;
