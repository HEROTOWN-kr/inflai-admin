import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import DashInfluencers from "./DashInfluencers";
import DashAdvertisers from "./DashAdvertisers";
import DashCampaigns from "./DashCampaigns";
import { useOutletContext } from "react-router-dom";

function Dashboard(props) {
  const { setMenuIndicator } = useOutletContext();
  useEffect(() => setMenuIndicator(0), []);

  return (
    <Box py={6} width={1200} sx={{ margin: "0 auto" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DashInfluencers {...props} />
        </Grid>
        <Grid item xs={12}>
          <DashAdvertisers {...props} />
        </Grid>
        <Grid item xs={12}>
          <DashCampaigns {...props} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
