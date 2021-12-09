import React, { Fragment, useEffect, useState } from 'react';

import {
  Link, Redirect, Route, Switch
} from 'react-router-dom';

import {
  Box, makeStyles, Tab, Tabs, Typography, withStyles
} from '@material-ui/core';
import Youtube from './Youtube/Youtube';
import Instagram from './Instagram/Instagram';
import StyledTabs from '../../containers/StyledTabs';
import StyledTab from '../../containers/StyledTab';

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

function Ranking(props) {
  const { setMenuIndicator, history, match } = props;
  const [tab, setTab] = useState(0);

  const classes = useStyles();

  useEffect(() => setMenuIndicator(4), []);

  return (
    <Fragment>
      <Box borderBottom="1px solid #e4dfdf">
        <Box maxWidth={1276} m="0 auto">
          <Typography variant="h4" classes={{ root: classes.title }}>인플루언서 랭킹</Typography>
          <StyledTabs
            className={classes.tabs}
            value={tab}
          >
            <StyledTab
              label="instagram"
              component={Link}
              to={`${match.url}/Instagram`}
            />
            <StyledTab
              label="youtube"
              component={Link}
              to={`${match.url}/Youtube`}
            />
          </StyledTabs>
        </Box>
      </Box>
      <Box pt={6} bgcolor="#f4f4f4">
        <Switch>
          <Route
            path={`${match.url}/Instagram`}
            render={renderProps => <Instagram {...props} setTab={setTab} />}
          />
          <Route
            path={`${match.url}/Youtube`}
            render={renderProps => <Youtube {...renderProps} setTab={setTab} />}
          />
          <Route
            exact
            path={`${match.url}/`}
            render={() => (
              <Redirect to={`${match.url}/Youtube`} />
            )}
          />
        </Switch>
      </Box>
    </Fragment>
  );
}

export default Ranking;
