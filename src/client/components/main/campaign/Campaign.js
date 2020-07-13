import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CampaignList from './CampaignList';
import CampaignDetail from './CampaignDetail';

function Campaign(props) {
  function goBack() {
    props.history.push(props.match.path);
  }

  return (
    <Switch>
      <Route
        path={`${props.match.path}/:id`}
        render={renderProps => <CampaignDetail {...renderProps} goBack={goBack} />}
      />
      <Route
        path={`${props.match.path}/`}
        render={renderProps => <CampaignList {...renderProps} />}
      />
    </Switch>
  );
}

export default Campaign;
