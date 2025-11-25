import React, { useState } from 'react';
import {
  Box
} from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
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
        <Routes>
          <Route path="/Dashboard" element={<Dashboard setMenuIndicator={setMenuIndicator} />} />
          <Route path="/Advertiser" element={<Advertiser setMenuIndicator={setMenuIndicator} />} />
          <Route path="/Influencer" element={<Influencer setMenuIndicator={setMenuIndicator} />} />
          <Route path="/Campaign" element={<Campaign setMenuIndicator={setMenuIndicator} />} />
          <Route path="/Ranking" element={<Ranking setMenuIndicator={setMenuIndicator} />} />
          <Route path="/Subscription" element={<Subscription setMenuIndicator={setMenuIndicator} />} />
          <Route path="/Payment" element={<Payment setMenuIndicator={setMenuIndicator} />} />
          <Route path="/Settings" element={<Settings setMenuIndicator={setMenuIndicator} />} />
          <Route path="/YoutubeDialog" element={<YoutubeAnalysis setMenuIndicator={setMenuIndicator} id={93} />} />
          <Route path="/" element={<Navigate to="/Dashboard" replace />} />
        </Routes>
      </Box>
    </div>

  );
}

export default Main;
