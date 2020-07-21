import React, { useState } from 'react';
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
  const [pageIndicator, setPageIndicator] = useState(0);

  function setMenuIndicator(value) {
    setPageIndicator(value);
  }

  return (
    <div>
      <Navbar {...props} pageIndicator={pageIndicator} setMenuIndicator={setMenuIndicator} />
      <Box py={6} px={2} className="main">
        <Switch>
          <Route
            path="/Dashboard"
            render={renderProps => <Dashboard {...renderProps} setMenuIndicator={setMenuIndicator} />}
          />
          <Route
            path="/Advertiser"
            render={renderProps => <Advertiser {...renderProps} setMenuIndicator={setMenuIndicator} />}
          />
          <Route
            path="/Influencer"
            render={renderProps => <Influencer {...renderProps} setMenuIndicator={setMenuIndicator} />}
          />
          <Route
            path="/Campaign"
            render={renderProps => <Campaign {...renderProps} setMenuIndicator={setMenuIndicator} />}
          />
          <Route
            path="/Ranking"
            render={renderProps => <Ranking {...renderProps} setMenuIndicator={setMenuIndicator} />}
          />
          <Route
            path="/Request"
            render={renderProps => <Request {...renderProps} setMenuIndicator={setMenuIndicator} />}
          />
          <Route
            path="/Settings"
            render={renderProps => <Settings {...renderProps} setMenuIndicator={setMenuIndicator} />}
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
