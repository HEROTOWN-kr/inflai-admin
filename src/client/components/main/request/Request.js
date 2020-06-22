import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import RequestDetail from './RequestDetail';
import RequestList from './RequestList';

function Request(props) {
  function goBack() {
    props.history.push(props.match.path);
  }

  return (
    <Switch>
      <Route
        path={`${props.match.path}/:id`}
        render={renderProps => <RequestDetail {...renderProps} goBack={goBack} />}
      />
      <Route
        path={`${props.match.path}/`}
        render={renderProps => <RequestList {...renderProps} />}
      />
    </Switch>
  );
}

export default Request;
