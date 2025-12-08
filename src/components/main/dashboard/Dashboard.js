import React, { useEffect } from "react";
import { Box } from "@mui/material";
import DashInfluencers from "./DashInfluencers";
import DashAdvertisers from "./DashAdvertisers";
import DashCampaigns from "./DashCampaigns";
import { useOutletContext } from "react-router-dom";

function Dashboard(props) {
  const { setMenuIndicator } = useOutletContext();
  useEffect(() => setMenuIndicator(0), []);

  return (
    <div className="py-24 w-[1200px] mx-auto">
      <div className="grid gap-2">
        <div className="w-full">
          <DashInfluencers {...props} />
        </div>
        <div className="w-full">
          <DashAdvertisers {...props} />
        </div>
        <div className="w-full">
          <DashCampaigns {...props} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
