import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PaymentList from './PaymentList';
import PaymentDetail from './PaymentDetail';

function Payment(props) {
  function goBack() {
    props.history.push(props.match.path);
  }

  return (
    <Switch>
      <Route
        path={`${props.match.path}/:id`}
        render={renderProps => <PaymentDetail {...renderProps} goBack={goBack} />}
      />
      <Route
        path={`${props.match.path}/`}
        render={renderProps => <PaymentList {...renderProps} />}
      />
    </Switch>
  );
}

export default Payment;
