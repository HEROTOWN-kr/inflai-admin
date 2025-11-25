import React from 'react';
import {
  AppBar, Box, Button, Grid, useMediaQuery, useTheme
} from '@mui/material';
import NavbarLogo from './NavbarLogo';
import NavbarLinks from './NavbarLinks';
import { Colors } from '../../../lib/Сonstants';

function Navbar(props) {
  const { changeUser } = props;

  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box px={{ xs: 2, md: 8 }} bgcolor={Colors.darkBlue}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <NavbarLogo />
        </Grid>
        <Grid item>
          <NavbarLinks {...props} isMD={isMD} changeUser={changeUser} />
        </Grid>
        { isMD ? (
          <Grid item>
            <Button variant="contained" color="secondary" onClick={() => changeUser({ token: '' })}>로그아웃</Button>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
}

export default Navbar;
