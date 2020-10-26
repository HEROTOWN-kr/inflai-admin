import React, { useEffect, useState } from 'react';
import {
  withRouter, Switch, Route, Redirect
} from 'react-router-dom';


import Main from './main/Main';
import Login from './login/Login';
import Common from '../lib/common';


function App(props) {
  const { history } = props;
  const { pathname } = history.location;
  const [user, setUser] = useState(Common.getUserInfo());

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
  );
}

export default withRouter(App);
