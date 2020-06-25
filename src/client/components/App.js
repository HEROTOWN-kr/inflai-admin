import React, { useEffect, useState } from 'react';
import {
  withRouter, Switch, Route, Redirect
} from 'react-router-dom';

import Main from './main/Main';
import Login from './login/Login';
import Common from '../lib/common';


function App(props) {
  const [user, setUser] = useState(Common.getUserInfo());

  function changeUser(data) {
    const newUser = { ...data };
    setUser(newUser);
    Common.saveUserInfo(newUser);
  }

  useEffect(() => {
    if (!user.token) {
      props.history.push('/Login');
    }
  }, [user]);


  return (
    <Switch>
      <Route
        exact
        path="/Login"
        render={renderProps => <Login {...renderProps} user={user} changeUser={changeUser} />}
      />
      {/* <Route
        path="/Main"
          // render={props => <ProductMix {...props} user={user} changeUser={changeUser} />}
        render={renderProps => <Main {...renderProps} />}
      /> */}
      <Route
        path="/Main"
        render={renderProps => <Main {...renderProps} changeUser={changeUser} />}
      />
      <Route
        exact
        path="/"
        render={() => (
          user.token
            ? <Redirect to="/Main/Dashboard" />
            : <Redirect to="/Login" />
        )}
      />
    </Switch>
  );
}

export default withRouter(App);
