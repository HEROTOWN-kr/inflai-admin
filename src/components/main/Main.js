import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";

function Main(props) {
  const [pageIndicator, setPageIndicator] = useState(0);

  function setMenuIndicator(value) {
    setPageIndicator(value);
  }

  return (
    <div>
      <Navbar {...props} pageIndicator={pageIndicator} setMenuIndicator={setMenuIndicator} />
      <Box className="main">
        <Outlet
          context={{
            setMenuIndicator: setMenuIndicator,
            id: 93,
          }}
        />
      </Box>
    </div>
  );
}

export default Main;
