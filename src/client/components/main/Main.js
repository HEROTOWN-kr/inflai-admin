import React from 'react';
import {
  Grid, List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';

import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Route, Switch, Link } from 'react-router-dom';
import Advertiser from './advertiser/Advertiser';
import Influencer from './influencer/Influencer';
import Payment from './payment/Payment';

function Main(props) {
  const links = [
    {
      name: '광고주',
      link: '/Advertiser'
    },
    {
      name: '인플루언서',
      link: '/Influencer'
    },
    {
      name: '판매관리 (결제관리)',
      link: '/Payment'
    },
  ];


  return (
    <Grid container className="main" alignItems="center">
      <Grid item md={2}>
        <Grid container>
          <Grid item md={12}>
            <List component="nav" aria-label="main mailbox folders">
              {links.map(item => (
                <ListItem
                  key={item.name}
                  button
                      // key={link.text}
                  component={renderProps => <Link to={props.match.path + item.link} {...renderProps} />}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
              {/* <ListItem
                button
                // key={link.text}
                component={renderProps => <Link to={`${props.match.path}/Advertiser`} {...renderProps} />}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="광고주" />
              </ListItem>
              <ListItem
                button
                  // key={link.text}
                component={renderProps => <Link to={`${props.match.path}/Influencer`} {...renderProps} />}
              >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="인플루언서" />
              </ListItem> */}
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={10}>
        <Switch>
          <Route
            path={`${props.match.path}/Advertiser`}
            // path="/Advertiser"
            render={renderProps => <Advertiser {...renderProps} />}
          />
          <Route
            path={`${props.match.path}/Influencer`}
          // render={props => <ProductMix {...props} user={user} changeUser={changeUser} />}
            render={renderProps => <Influencer {...renderProps} />}
          />
          <Route
            path={`${props.match.path}/Payment`}
              // render={props => <ProductMix {...props} user={user} changeUser={changeUser} />}
            render={renderProps => <Payment {...renderProps} />}
          />
        </Switch>
      </Grid>
    </Grid>
  );
}

export default Main;
