import React, { useEffect, useState } from "react";
import { axiosInstance as axios } from "@lib/axiosInstance";
import { Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Button, Box } from "@mui/material";
import StyledTableCell from "../../containers/StyledTableCell";
import StyledTableRow from "../../containers/StyledTableRow";
import DashInfluencers from "./DashInfluencers";
import DashAdvertisers from "./DashAdvertisers";
import DashCampaigns from "./DashCampaigns";

function Dashboard(props) {
  const { setMenuIndicator } = props;
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
