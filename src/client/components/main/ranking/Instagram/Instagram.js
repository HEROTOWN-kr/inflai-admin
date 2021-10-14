import React, { useEffect, useState } from 'react';
import {
  Redirect, Route, Switch, useRouteMatch
} from 'react-router-dom';
import RankingDetail from './RankingDetail';
import InstagramList from './InstagramList';

function Instagram(props) {
  const { setTab } = props;
  const match = useRouteMatch();

  useEffect(() => setTab(0), []);

  return (
    <Switch>
      <Route
        path={`${match.url}/List/`}
        render={renderProps => <InstagramList {...props} />}
      />
      <Route
        path={`${match.url}/Detail/:id`}
        render={renderProps => <RankingDetail {...renderProps} />}
      />
      <Route
        exact
        path={`${match.url}/`}
        render={() => (
          <Redirect to={`${match.url}/List/`} />
        )}
      />
    </Switch>
  );
}

export default Instagram;
