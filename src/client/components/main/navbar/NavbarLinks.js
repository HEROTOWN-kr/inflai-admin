import React, { Fragment, useState } from 'react';
import {
  Box, Button, Divider, Drawer, Icon, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, SvgIcon
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import {
  AccountBalanceWallet, Settings, Dashboard, Help,
  Equalizer, MonetizationOn, YouTube, AccessibilityNew, Menu
} from '@material-ui/icons';
import AntTabs from './StyledTabs';
import AntTab from './StyledTab';
import StyledButton from '../../containers/StyledButton';

const useStyles = makeStyles({
  menuButton: {
    color: '#fff'
  },
  list: {
    width: 250,
  },
  icon: {
    minWidth: '35px'
  },
  logout: {
    marginTop: '10px'
  }
});

const menuLinks = [
  {
    name: '대시보드',
    link: '/Dashboard',
    icon: Dashboard
  },
  {
    name: '광고주',
    link: '/Advertiser',
    icon: AccessibilityNew
  },
  {
    name: '인플루언서',
    link: '/Influencer',
    icon: YouTube
  },
  {
    name: '캠페인관리',
    link: '/Campaign',
    icon: MonetizationOn
  },
  {
    name: '랭킹(순위)',
    link: '/Ranking',
    icon: Equalizer
  },
  /* {
    name: '켐페인 요청',
    link: '/Request',
    icon: Help
  }, */
  {
    name: '서브스크립션',
    link: '/Subscription',
    icon: MonetizationOn
  },
  {
    name: '결제',
    link: '/Payment',
    icon: AccountBalanceWallet
  },
  {
    name: '설정',
    link: '/Settings',
    icon: Settings
  },
];

function NavbarLinks(props) {
  const {
    pageIndicator, setMenuIndicator, isMD, changeUser
  } = props;
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const history = useHistory();
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setMenuIndicator(newValue);
  };

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setSideBarOpen(!sideBarOpen);
  };

  return (
    <Box className="navbar-links">
      {isMD ? (
        <AntTabs
          value={pageIndicator}
          onChange={handleChange}
          centered
        >
          {menuLinks.map((item) => {
            const IconTag = item.icon;
            return (
              <AntTab
                key={item.link}
                icon={<IconTag />}
                label={item.name}
                component={Link}
                to={item.link}
              />
            );
          })}
        </AntTabs>
      ) : (
        <Fragment>
          <IconButton edge="start" className={classes.menuButton} aria-label="menu" onClick={toggleDrawer}>
            <Menu />
          </IconButton>
          <Drawer anchor="right" open={sideBarOpen} onClose={toggleDrawer}>
            <Box
              className={classes.list}
              role="presentation"
              onClick={toggleDrawer}
              onKeyDown={toggleDrawer}
            >
              <List>
                {menuLinks.map(item => (
                  <ListItem button onClick={() => history.push(item.link)} key={item.name}>
                    <ListItemIcon className={classes.icon}><SvgIcon component={item.icon} /></ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <StyledButton background="red" color="white" classname={classes.logout} onClick={() => changeUser({ token: '' })}>로그아웃</StyledButton>
            </Box>
          </Drawer>
        </Fragment>
      )}
    </Box>
  );
}

export default NavbarLinks;
