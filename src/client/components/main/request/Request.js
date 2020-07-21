import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import RequestDetail from './RequestDetail';
import RequestList from './RequestList';
import CreateCampaign from './CreateCampaign';
import CampaignList from '../campaign/CampaignList';

function Request(props) {
  const { setMenuIndicator, history, match } = props;
  useEffect(() => setMenuIndicator(5), []);
  const [influencers, setInfluencers] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = React.useState(1);

  function goBack() {
    history.push(match.path);
  }

  function goToCreate(id) {
    history.push(`${match.path}/create/${id}`);
  }

  return (
    <div className="request">
      <Switch>
        <Route
          path={`${match.path}/create/:id`}
          render={renderProps => <CreateCampaign {...renderProps} goBack={goBack} />}
        />
        <Route
          path={`${match.path}/:id`}
          render={renderProps => <RequestDetail {...renderProps} goBack={goBack} goToCreate={goToCreate} />}
        />
        <Route
          path={`${match.path}/`}
          render={renderProps => (
            <RequestList
              {...renderProps}
              influencers={influencers}
              setInfluencers={setInfluencers}
              count={count}
              setCount={setCount}
              page={page}
              setPage={setPage}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default Request;
