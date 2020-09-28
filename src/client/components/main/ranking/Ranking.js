import React, { useEffect } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import RankingList from './RankingList';
import RankingDetail from './RankingDetail';
import Dashboard from '../dashboard/Dashboard';

function Ranking(props) {
  const { setMenuIndicator, history, match } = props;
  useEffect(() => setMenuIndicator(4), []);

  return (
    <Switch>
      <Route
        path={`${match.path}/List/`}
        render={renderProps => <RankingList {...props} />}
      />
      <Route
        path={`${match.path}/Detail/:id`}
        render={renderProps => <RankingDetail {...renderProps} />}
      />
      <Route
        exact
        path={`${match.path}/`}
        render={() => (
          <Redirect to={`${match.path}/List/`} />
        )}
      />
    </Switch>
  );
}

export default Ranking;
