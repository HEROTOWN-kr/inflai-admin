import React, { Fragment, useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';

import {
  Link
} from 'react-router-dom';
import { Routes, Route, Navigate, useMatch } from 'react-router-dom';

import { Box, Tab, Tabs, Typography } from '@mui/material';
import Youtube from './Youtube/Youtube';
import Instagram from './Instagram/Instagram';
import StyledTabs from '../../containers/StyledTabs';
import StyledTab from '../../containers/StyledTab';

const PREFIX = 'Ranking';

const classes = {
  title: `${PREFIX}-title`,
  tabs: `${PREFIX}-tabs`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  [`& .${classes.title}`]: {
    fontFamily: 'Noto Sans KR, sans-serif',
    fontWeight: 700,
    marginTop: '96px',
    marginBottom: '48px'
  },
  [`& .${classes.tabs}`]: {
    root: {},
    indicator: {}
  }
});

function Ranking(props) {
  const { setMenuIndicator, history } = props;
  const [tab, setTab] = useState(0);



  useEffect(() => setMenuIndicator(4), [setMenuIndicator]);

  // useMatch to derive base path when this component is mounted under a parent route
  const match = useMatch('/Ranking/*');
  const basePath = match ? '/Ranking' : '';

  return (
    <Root>
      <Box borderBottom="1px solid #e4dfdf">
        <Box maxWidth={1276} m="0 auto">
          <Typography variant="h4" classes={{ root: classes.title }}>인플루언서 랭킹</Typography>
          <StyledTabs
            className={classes.tabs}
            value={tab}
          >
            <StyledTab
              label="instagram"
              component={Link}
              to={`${basePath}/Instagram`}
            />
            <StyledTab
              label="youtube"
              component={Link}
              to={`${basePath}/Youtube`}
            />
          </StyledTabs>
        </Box>
      </Box>
      <Box pt={6} bgcolor="#f4f4f4">
        <Routes>
          <Route path="Instagram/*" element={<Instagram {...props} setTab={setTab} />} />
          <Route path="Youtube/*" element={<Youtube {...props} setTab={setTab} />} />
          <Route path="/" element={<Navigate to={basePath ? '/Ranking/Youtube' : 'Youtube'} replace />} />
        </Routes>
      </Box>
    </Root>
  );
}

export default Ranking;
