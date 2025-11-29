import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";

import { Link, Outlet, useMatch, useOutletContext } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import StyledTabs from "../../containers/StyledTabs";
import StyledTab from "../../containers/StyledTab";

const PREFIX = "Ranking";

const classes = {
  title: `${PREFIX}-title`,
  tabs: `${PREFIX}-tabs`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")({
  [`& .${classes.title}`]: {
    fontFamily: "Noto Sans KR, sans-serif",
    fontWeight: 700,
    marginTop: "96px",
    marginBottom: "48px",
  },
  [`& .${classes.tabs}`]: {
    root: {},
    indicator: {},
  },
});

function Ranking() {
  const { setMenuIndicator, history, ...props } = useOutletContext();
  const [tab, setTab] = useState(0);

  useEffect(() => setMenuIndicator(4), [setMenuIndicator]);

  // useMatch to derive base path when this component is mounted under a parent route
  const match = useMatch("/Ranking/*");
  const basePath = match ? "/Ranking" : "";

  return (
    <Root>
      <Box borderBottom="1px solid #e4dfdf">
        <Box maxWidth={1276} m="0 auto">
          <Typography variant="h4" classes={{ root: classes.title }}>
            인플루언서 랭킹
          </Typography>
          <StyledTabs className={classes.tabs} value={tab}>
            <StyledTab label="instagram" component={Link} to={`${basePath}/Instagram`} />
            <StyledTab label="youtube" component={Link} to={`${basePath}/Youtube`} />
          </StyledTabs>
        </Box>
      </Box>
      <Box pt={6} bgcolor="#f4f4f4">
        <Outlet context={{ ...props, setTab }} />
      </Box>
    </Root>
  );
}

export default Ranking;
