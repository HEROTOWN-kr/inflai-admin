import React from 'react';
import {
  Button,
  Grid, List, ListItem, ListItemIcon, ListItemText, SvgIcon
} from '@material-ui/core';

import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Route, Switch, Link } from 'react-router-dom';
import Advertiser from './advertiser/Advertiser';
import Influencer from './influencer/Influencer';
import Payment from './payment/Payment';

import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

function Main(props) {
  const links = [
    {
      name: '광고주',
      link: '/Advertiser',
      icon: AccessibilityNewIcon
    },
    {
      name: '인플루언서',
      link: '/Influencer',
      icon: YouTubeIcon
    },
    {
      name: '판매관리 (결제관리)',
      link: '/Payment',
      icon: MonetizationOnIcon
    },
  ];


  return (
    <Grid container className="main" alignItems="center">
      <Grid item md={2} className="left-panel">
        <Grid container justify="center" spacing={3} alignItems="center">
          <Grid item md={6}>
            <Button fullWidth variant="contained" color="secondary" onClick={() => props.changeUser({ token: '' })}>로그아웃</Button>
          </Grid>
          <Grid item md={12}>
            <List component="nav" aria-label="main mailbox folders">
              {links.map(item => (
                <ListItem
                  key={item.name}
                  button
                  component={renderProps => <Link to={props.match.path + item.link} {...renderProps} />}
                >
                  <ListItemIcon>
                    {/*<InboxIcon />*/}
                    <SvgIcon component={item.icon} />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={10}>
        <Switch>
          <Route
            path={`${props.match.path}/Advertiser`}
            render={renderProps => <Advertiser {...renderProps} />}
          />
          <Route
            path={`${props.match.path}/Influencer`}
            render={renderProps => <Influencer {...renderProps} />}
          />
          <Route
            path={`${props.match.path}/Payment`}
            render={renderProps => <Payment {...renderProps} />}
          />
        </Switch>
      </Grid>
    </Grid>
  );
}

export default Main;
