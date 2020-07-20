import React from 'react';
import {
  Box
} from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';

import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import HelpIcon from '@material-ui/icons/Help';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Influencer from './influencer/Influencer';
import Advertiser from './advertiser/Advertiser';
import Ranking from './ranking/Ranking';
import Request from './request/Request';
import Dashboard from './dashboard/Dashboard';
import Campaign from './campaign/Campaign';
import Navbar from './navbar/Navbar';
import Settings from './settings/Settings';

function Main(props) {
  const links = [
    {
      name: '대시보드',
      link: '/Dashboard',
      icon: DashboardIcon
    },
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
      name: '캠페인관리 (결제관리)',
      link: '/Campaign',
      icon: MonetizationOnIcon
    },
    {
      name: '랭킹(순위)',
      link: '/Ranking',
      icon: EqualizerIcon
    },
    {
      name: '켐페인 요청',
      link: '/Request',
      icon: HelpIcon
    },
  ];


  return (
    <div>
      <Navbar {...props} />
      <Box py={6} px={2} className="main">
        <Switch>
          <Route
            path="/Dashboard"
            render={renderProps => <Dashboard {...renderProps} />}
          />
          <Route
            path="/Advertiser"
            render={renderProps => <Advertiser {...renderProps} />}
          />
          <Route
            path="/Influencer"
            render={renderProps => <Influencer {...renderProps} />}
          />
          <Route
            path="/Campaign"
            render={renderProps => <Campaign {...renderProps} />}
          />
          <Route
            path="/Ranking"
            render={renderProps => <Ranking {...renderProps} />}
          />
          <Route
            path="/Request"
            render={renderProps => <Request {...renderProps} />}
          />
          <Route
            path="/Settings"
            render={renderProps => <Settings {...renderProps} />}
          />
          <Route
            exact
            path="/"
            render={() => (
              <Redirect to="/Dashboard" />
            )}
          />
        </Switch>
      </Box>
    </div>

  );
}

export default Main;
