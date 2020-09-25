import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import RankingList from './RankingList';
import RankingDetail from './RankingDetail';

function Ranking(props) {
  return (
    <Switch>
      <Route
        path="/List"
        render={renderProps => <RankingList {...renderProps} setMenuIndicator={setMenuIndicator} />}
      />
      <Route
        path="/Advertiser"
        render={renderProps => <RankingDetail {...renderProps} setMenuIndicator={setMenuIndicator} />}
      />
      <Route
        exact
        path="/"
        render={() => (
          <Redirect to="/Dashboard" />
        )}
      />
    </Switch>
  );
}

export default Ranking;
