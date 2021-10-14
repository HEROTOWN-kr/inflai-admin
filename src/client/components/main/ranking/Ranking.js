import React, { Fragment, useEffect } from 'react';

import {
  Link, Redirect, Route, Switch
} from 'react-router-dom';

import {
  Box, makeStyles, Tab, Tabs, Typography
} from '@material-ui/core';
import RankingList from './RankingList';
import RankingDetail from './RankingDetail';
import Dashboard from '../dashboard/Dashboard';

const useStyles = makeStyles({
  title: {
    fontFamily: 'Noto Sans KR, sans-serif',
    fontWeight: 700,
    marginTop: '96px',
    marginBottom: '48px'
  },
  tabs: {
    root: {
      color: 'red'
    },
    indicator: {
      backgroundColor: '#66f8ff',
    }
  }
});

function Ranking(props) {
  const { setMenuIndicator, history, match } = props;
  const classes = useStyles();

  useEffect(() => setMenuIndicator(4), []);

  return (
    <Fragment>
      <Box borderBottom="1px solid #e4dfdf">
        <Box maxWidth={1276} m="0 auto">
          <Typography variant="h4" classes={{ root: classes.title }}>인플루언서 랭킹</Typography>
          <Tabs
            className={classes.tabs}
            value={0}
          >
            <Tab
              label="youtube"
              component={Link}
              to="/Ranking/List/"
            />
            <Tab
              label="instagram"
              component={Link}
              to="/Ranking/List/"
            />
          </Tabs>
        </Box>
      </Box>
      <Box pt={6} bgcolor="#f4f4f4">
        <Switch>
          <Route
            path={`${match.path}/List/`}
            render={renderProps => <RankingList {...props} />}
          />
          <Route
            path={`${match.path}/Detail/:id`}
            render={renderProps => <RankingDetail {...renderProps} />}
          />
          <Route
            exact
            path={`${match.path}/`}
            render={() => (
              <Redirect to={`${match.path}/List/`} />
            )}
          />
        </Switch>
      </Box>

    </Fragment>
  );
}

export default Ranking;
