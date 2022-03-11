import React, {
  createRef, Fragment, useEffect, useState
} from 'react';
import {
  withRouter, Switch, Route, Redirect
} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import Main from './main/Main';
import Login from './login/Login';
import Common from '../lib/common';

const useStyles = makeStyles({
  snackbarCloseIcon: {
    cursor: 'pointer'
  }
});


function App(props) {
  const { history } = props;
  const [user, setUser] = useState(Common.getUserInfo());
  const classes = useStyles();

  const snackbarRef = createRef();
  const onClickDismiss = key => () => {
    snackbarRef.current.closeSnackbar(key);
  };

  /* useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); */

  function changeUser(data) {
    const newUser = { ...data };
    setUser(newUser);
    Common.saveUserInfo(newUser);
  }

  useEffect(() => {
    if (!user.token) {
      history.push('/Login');
    }
  }, [user]);


  return (
    <Fragment>
      <SnackbarProvider
        ref={snackbarRef}
        action={key => (
          <Close className={classes.snackbarCloseIcon} onClick={onClickDismiss(key)} />
        )}
      >
        <Switch>
          <Route
            exact
            path="/Login"
            render={renderProps => <Login {...renderProps} user={user} changeUser={changeUser} />}
          />
          <Route
            path="/"
            render={renderProps => <Main {...renderProps} changeUser={changeUser} />}
          />
          <Route
            exact
            path="/"
            render={() => (
              user.token
                ? <Redirect to="/" />
                : <Redirect to="/Login" />
            )}
          />
        </Switch>
      </SnackbarProvider>
    </Fragment>

  );
}

export default withRouter(App);
