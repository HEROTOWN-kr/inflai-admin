import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CampaignList from './CampaignList';
import CampaignDetail from './CampaignDetail';
import CampaignCreate from './CampaignCreate';

function Campaign(props) {
  const { setMenuIndicator } = props;
  useEffect(() => setMenuIndicator(3), []);
  const [payments, setPayments] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = React.useState(1);

  function goBack() {
    props.history.push(props.match.path);
  }

  return (
    <Switch>
      <Route
        exact
        path={`${props.match.path}/List`}
        render={renderProps => (
          <CampaignList
            {...props}
            payments={payments}
            setPayments={setPayments}
            count={count}
            setCount={setCount}
            page={page}
            setPage={setPage}
          />
        )}
      />
      <Route
        exact
        path={`${props.match.path}/create`}
        render={renderProps => <CampaignCreate {...renderProps} goBack={goBack} />}
      />
      <Route
        exact
        path={`${props.match.path}/:id`}
        render={renderProps => <CampaignDetail {...renderProps} goBack={goBack} />}
      />
      <Route
        exact
        path={`${props.match.path}/`}
        render={() => (
          <Redirect to={`${props.match.path}/List`} />
        )}
      />
    </Switch>
  );
}

export default Campaign;
