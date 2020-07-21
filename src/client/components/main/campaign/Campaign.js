import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import CampaignList from './CampaignList';
import CampaignDetail from './CampaignDetail';

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
        path={`${props.match.path}/:id`}
        render={renderProps => <CampaignDetail {...renderProps} goBack={goBack} />}
      />
      <Route
        path={`${props.match.path}/`}
        render={renderProps => (
          <CampaignList
            {...renderProps}
            payments={payments}
            setPayments={setPayments}
            count={count}
            setCount={setCount}
            page={page}
            setPage={setPage}
          />
        )}
      />
    </Switch>
  );
}

export default Campaign;
