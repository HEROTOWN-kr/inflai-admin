import React, { useEffect, useState } from 'react';
import {
  Route, Switch, Redirect, useRouteMatch, useHistory
} from 'react-router-dom';
import {
  Box, Grid, List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import { Drafts, Inbox } from '@material-ui/icons';
import KakaoNotify from './pages/KakaoNotify';
import NotFound from '../NotFound';
import Coupon from './pages/Coupon';

const Menu = [
  {
    text: '쿠폰',
    icon: Inbox,
    url: '/Coupon'
  },
  {
    text: '카카오 알림',
    icon: Drafts,
    url: '/KakaoNotify'
  },
];

function Settings(props) {
  const { setMenuIndicator } = props;
  const match = useRouteMatch();
  const history = useHistory();

  useEffect(() => setMenuIndicator(7), []);

  const handleListItemClick = (index) => {
    history.push(match.url + Menu[index].url);
  };

  return (
    <Grid container>
      <Grid item>
        <Box width={250} borderRight="1px solid black">
          <List component="nav" aria-label="main mailbox folders">
            {Menu.map((item, index) => {
              const IconTag = item.icon;
              return (
                <ListItem button key={item.text} onClick={() => handleListItemClick(index)}>
                  <ListItemIcon>
                    <IconTag />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Grid>
      <Grid item xs>
        <Switch>
          <Route
            path={`${match.url}/KakaoNotify`}
            render={renderProps => <KakaoNotify {...props} />}
          />
          <Route
            path={`${match.url}/Coupon`}
            render={renderProps => <Coupon {...props} />}
          />
          <Route
            exact
            path={`${match.url}/`}
            render={() => (
              <Redirect to={`${match.url}/Coupon`} />
            )}
          />
          <Route
            component={NotFound}
          />
        </Switch>
      </Grid>
    </Grid>
  );
}

export default Settings;
