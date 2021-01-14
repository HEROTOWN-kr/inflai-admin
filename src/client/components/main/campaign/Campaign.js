import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  Box, Paper, Tabs, Tab
} from '@material-ui/core';
import CampaignList from './CampaignList';
import CampaignDetail from './CampaignDetail';
import CampaignCreate from './CampaignCreate';
import Request from '../request/Request';
import RequestList from '../request/RequestList';
import RequestDetail from '../request/RequestDetail';
import CampaignCreateNew from './CampaignCreateNew';
import CampaignEdit from './CampaignEdit';

function Campaign(props) {
  const { setMenuIndicator, history, match } = props;
  const [value, setValue] = useState(0);

  useEffect(() => setMenuIndicator(3), []);

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      history.push(`${match.path}/List`);
    } else {
      history.push(`${match.path}/Request`);
    }
    setValue(newValue);
  };

  function goBack() {
    history.push(match.path);
  }

  return (
    <React.Fragment>
      <Box width={1200} css={{ margin: '0 auto' }}>
        <Paper>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="등록된 캠페인" />
            <Tab label="캠페인 요청" />
          </Tabs>
        </Paper>
      </Box>
      <Switch>
        <Route
          exact
          path={`${match.path}/List`}
          render={renderProps => (<CampaignList {...props} />)}
        />
        <Route
          exact
          path={`${match.path}/Request`}
          render={renderProps => <RequestList {...renderProps} />}
        />
        <Route
          exact
          path={`${match.path}/Request/:id`}
          render={renderProps => <RequestDetail {...renderProps} />}
        />
        <Route
          exact
          path={`${match.path}/create`}
          render={renderProps => <CampaignCreateNew {...renderProps} goBack={goBack} />}
        />
        <Route
          exact
          path={`${match.path}/:id`}
          render={renderProps => <CampaignEdit {...renderProps} goBack={goBack} />}
        />
        <Route
          exact
          path={`${match.path}/`}
          render={() => (
            <Redirect to={`${match.path}/List`} />
          )}
        />
      </Switch>
    </React.Fragment>

  );
}

export default Campaign;
