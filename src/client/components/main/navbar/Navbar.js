import React from 'react';
import { AppBar, Button, Grid } from '@material-ui/core';
import NavbarLogo from './NavbarLogo';
import NavbarLinks from './NavbarLinks';

function Navbar(props) {
  const { changeUser } = props;
  return (
    <div className="navbar">
      <AppBar position="static" color="transparent" className="navbar-content">
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <NavbarLogo />
          </Grid>
          <Grid item>
            <NavbarLinks />
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={() => changeUser({ token: '' })}>로그아웃</Button>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
}

export default Navbar;
