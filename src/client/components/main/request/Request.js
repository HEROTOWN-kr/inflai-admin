import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import RequestDetail from './RequestDetail';
import RequestList from './RequestList';
import CreateCampaign from './CreateCampaign';

function Request(props) {
  function goBack() {
    props.history.push(props.match.path);
  }

  function goToCreate(id) {
    props.history.push(`${props.match.path}/create/${id}`);
  }

  return (
    <div className="request">
      <Switch>
        <Route
          path={`${props.match.path}/create/:id`}
          render={renderProps => <CreateCampaign {...renderProps} goBack={goBack} />}
        />
        <Route
          path={`${props.match.path}/:id`}
          render={renderProps => <RequestDetail {...renderProps} goBack={goBack} goToCreate={goToCreate} />}
        />
        <Route
          path={`${props.match.path}/`}
          render={renderProps => <RequestList {...renderProps} />}
        />
      </Switch>
    </div>
  );
}

export default Request;
