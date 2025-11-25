import React, {
  createRef, Fragment, useEffect, useState
} from 'react';
import {
  useNavigate, Routes, Route, Navigate
} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Close } from '@mui/icons-material';
import Main from './main/Main';
import Login from './login/Login';
import AuthContext from '../context/AuthContext';
import useLoading from './hooks/useLoading';
import StyledBackDrop from './containers/StyledBackDrop';
import { getUserInfo, saveUserInfo } from '../lib/common';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const PREFIX = 'App';

const classes = {
  snackbarCloseIcon: `${PREFIX}-snackbarCloseIcon`
};

const StyledAuthContextProvider = styled(AuthContext.Provider)({
  [`& .${classes.snackbarCloseIcon}`]: {
    cursor: 'pointer'
  }
});

const theme = createTheme({
    status: {
        danger: orange[500],
    },
});


function App() {
  const navigate = useNavigate(); // replace history from withRouter
  const [user, setUser] = useState(getUserInfo);


  const { isLoading, setLoading } = useLoading();
  const snackbarRef = createRef();
  const onClickDismiss = key => () => {
    snackbarRef.current.closeSnackbar(key);
  };

  function changeUser(data) {
    const newUser = { ...data };
    setUser(newUser);
    saveUserInfo(newUser);
  }

  useEffect(() => {
    if (!user.token) {
      navigate('/Login'); // useNavigate instead of navigate
    }
  }, [user, navigate]);


  return (
    <StyledAuthContextProvider value={{ isLoading, setLoading }}>
      <SnackbarProvider
        ref={snackbarRef}
        action={key => (
          <Close className={classes.snackbarCloseIcon} onClick={onClickDismiss(key)} />
        )}
      >
          <ThemeProvider theme={theme}>

          <Routes>
          <Route
            path="/Login"
            element={<Login user={user} changeUser={changeUser} />}
          />
          <Route
            path="/*"
            element={<Main changeUser={changeUser} />}
          />
          {/* Optional explicit root redirect: if you prefer a route that chooses by auth state */}
          <Route
            path="/home"
            element={user.token ? <Navigate to="/" /> : <Navigate to="/Login" />}
          />
        </Routes>
        <StyledBackDrop open={isLoading} />
        </ThemeProvider>

      </SnackbarProvider>
    </StyledAuthContextProvider>
  );
}

export default App;
