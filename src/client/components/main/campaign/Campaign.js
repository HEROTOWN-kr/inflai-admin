import React, { Fragment, useEffect, useState } from 'react';
import {
  Link, Redirect, Route, Switch, useRouteMatch
} from 'react-router-dom';
import {
  Box, Paper, Tabs, Tab, Typography, makeStyles
} from '@material-ui/core';
import CampaignList from './CampaignList';
import CampaignDetail from './CampaignDetail';
import CampaignCreate from './CampaignCreate';
import Request from '../request/Request';
import RequestList from '../request/RequestList';
import RequestDetail from '../request/RequestDetail';
import CampaignCreateNew from './CampaignCreateNew';
import CampaignEdit from './CampaignEdit';
import CampaignParInsta from './CampaignParInsta';
import CampaignParBlog from './CampaignParBlog';
import StyledTabs from '../../containers/StyledTabs';
import StyledTab from '../../containers/StyledTab';
import CampaignParYoutube from './CampaignParYoutube';
import Question from '../question/Question';

const useStyles = makeStyles({
  title: {
    fontFamily: 'Noto Sans KR, sans-serif',
    fontWeight: 700,
    marginTop: '96px',
    marginBottom: '48px'
  },
  tabs: {
    root: {},
    indicator: {}
  }
});

function Campaign(props) {
  const { setMenuIndicator } = props;
  const [tab, setTab] = useState(0);

  const classes = useStyles();
  const match = useRouteMatch();

  useEffect(() => setMenuIndicator(3), []);

  return (
    <Fragment>
      <Box borderBottom="1px solid #e4dfdf">
        <Box maxWidth={1276} m="0 auto">
          <Typography variant="h4" classes={{ root: classes.title }}>캠페인 관리</Typography>
          <StyledTabs
            className={classes.tabs}
            value={tab}
          >
            <StyledTab
              label="등록된 캠페인"
              component={Link}
              to={`${match.url}/List`}
            />
            <StyledTab
              label="캠페인 요청"
              component={Link}
              to={`${match.url}/Request`}
            />
          </StyledTabs>
        </Box>
      </Box>
      <Box py={2} bgcolor="#f4f4f4">
        <Switch>
          <Route
            exact
            path={`${match.path}/List`}
            render={renderProps => (<CampaignList {...props} setTab={setTab} />)}
          />
          <Route
            exact
            path={`${match.path}/ParInsta/:id`}
            render={renderProps => <CampaignParInsta {...renderProps} />}
          />
          <Route
            exact
            path={`${match.path}/ParYoutube/:id`}
            render={renderProps => <CampaignParYoutube {...renderProps} />}
          />
          <Route
            exact
            path={`${match.path}/ParBlog/:id`}
            render={renderProps => <CampaignParBlog {...renderProps} />}
          />
          <Route
            exact
            path={`${match.path}/Request`}
            render={renderProps => <RequestList {...renderProps} setTab={setTab} />}
          />
          <Route
            exact
            path={`${match.path}/Request/:id`}
            render={renderProps => <RequestDetail {...renderProps} />}
          />
          <Route
            exact
            path={`${match.path}/create`}
            render={renderProps => <CampaignCreateNew {...renderProps} />}
          />
          <Route
            exact
            path={`${match.path}/:id`}
            render={renderProps => <CampaignEdit {...renderProps} />}
          />
          <Route
            exact
            path={`${match.path}/Question/:id`}
            render={renderProps => <Question {...renderProps} />}
          />
          <Route
            exact
            path={`${match.path}/`}
            render={() => (
              <Redirect to={`${match.path}/List`} />
            )}
          />
        </Switch>
      </Box>
    </Fragment>
  );
}

export default Campaign;
