import React, { useState } from 'react';
import {
  Box
} from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import Influencer from './influencer/Influencer';
import Advertiser from './advertiser/Advertiser';
import Ranking from './ranking/Ranking';
import Dashboard from './dashboard/Dashboard';
import Campaign from './campaign/Campaign';
import Navbar from './navbar/Navbar';
import Settings from './settings/Settings';
import Subscription from './subscription/Subscription';
import Payment from './payment/Payment';
import YoutubeAnalysis from './ranking/Youtube/YoutubeAnalysis';

function Main(props) {
  const [pageIndicator, setPageIndicator] = useState(0);

  function setMenuIndicator(value) {
    setPageIndicator(value);
  }

  return (
    <div>
      <Navbar {...props} pageIndicator={pageIndicator} setMenuIndicator={setMenuIndicator} />
      <Box className="main">
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
            path="/Subscription"
            render={renderProps => <Subscription {...renderProps} setMenuIndicator={setMenuIndicator} />}
          />
          <Route
            path="/Payment"
            render={renderProps => <Payment {...renderProps} setMenuIndicator={setMenuIndicator} />}
          />
          <Route
            path="/Settings"
            render={renderProps => <Settings {...renderProps} setMenuIndicator={setMenuIndicator} />}
          />
          <Route
            path="/YoutubeDialog"
            render={renderProps => <YoutubeAnalysis {...renderProps} setMenuIndicator={setMenuIndicator} id={93} />}
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
