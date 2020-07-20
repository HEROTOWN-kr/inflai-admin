import React from 'react';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Logo from '../../../img/logo_white.png';

function NavbarLogo() {
  const styles = {
    width: '146px',
    height: '27px',
    overflow: 'hidden',
    backgroundImage: `url(${Logo})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <Box my={2} className="logo">
      <Link
        to="/"
      >
        <div style={styles} />
      </Link>
    </Box>
  );
}

export default NavbarLogo;
