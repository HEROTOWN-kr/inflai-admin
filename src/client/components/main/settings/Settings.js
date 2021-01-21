import React, { useEffect, useState } from 'react';
import {
  Box, Button, Grid, TextField
} from '@material-ui/core';
import { Formik } from 'formik';
import axios from 'axios';
import MyTextField from '../../containers/MyTextField';
import StyledButton from '../../containers/StyledButton';
import StyledBackDrop from '../../containers/StyledBackDrop';

function Settings(props) {
  const { setMenuIndicator } = props;
  useEffect(() => setMenuIndicator(6), []);

  return (
    <Box />
  );
}

export default Settings;
