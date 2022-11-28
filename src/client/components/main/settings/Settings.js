import React, { useEffect, useState } from 'react';
import {
  Route, Switch, Redirect, useRouteMatch, useHistory
} from 'react-router-dom';
import {
  Box, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles
} from '@material-ui/core';
import { Drafts, Inbox, Notifications } from '@material-ui/icons';
import KakaoNotify from './pages/KakaoNotify';
import NotFound from '../NotFound';
import Coupon from './pages/Coupon';
import { Colors } from '../../../lib/Сonstants';

const Menu = [
  {
    id: 1,
    text: '카카오 알림',
    icon: Notifications,
    url: '/KakaoNotify'
  },
  {
    id: 2,
    text: '쿠폰',
    icon: Inbox,
    url: '/Coupon'
  },

];

const useStyles = makeStyles(theme => ({
  selectedItem: {
    backgroundColor: Colors.darkBlue,
    '&:hover': {
      backgroundColor: Colors.darkBlue,
    }
  }
}));


function Settings(props) {
  const { setMenuIndicator } = props;
  const [selectedMenu, setSelectedMenu] = useState(1);
  const match = useRouteMatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => setMenuIndicator(7), []);

  const handleListItemClick = (item) => {
    setSelectedMenu(item.id);
    history.push(match.url + item.url);
  };

  return (
    <Grid container>
      <Grid item>
        <Box width={250} minHeight="100vh" borderRight="1px solid black">
          <List component="nav" disablePadding aria-label="main mailbox folders">
            {Menu.map((item) => {
              const IconTag = item.icon;
              return (
                <ListItem button key={item.text} classes={{ selected: classes.selectedItem }} selected={selectedMenu === item.id} onClick={() => handleListItemClick(item)}>
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
              <Redirect to={`${match.url}/KakaoNotify`} />
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
