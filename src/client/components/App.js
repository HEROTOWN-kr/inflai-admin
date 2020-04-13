import React, { useEffect, useState } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Main from './main/Main';
import Login from './login/Login';


function App(props) {
  const [user, setUser] = useState({});

  function loginUser() {
    setUser({ token: 'token' });
  }

  /* useEffect(() => {
    user.token ? props.history.push('/Main') : props.history.push('/Login');
  }, [user.token]); */


  return (
    <Switch>
      {/* <Route
        exact
        path="/Login"
        render={renderProps => <Login {...renderProps} user={user} loginUser={loginUser} />}
      /> */}
      {/* <Route
        path="/Main"
          // render={props => <ProductMix {...props} user={user} changeUser={changeUser} />}
        render={renderProps => <Main {...renderProps} />}
      /> */}
        /*
      <Route
        path="/Main"
        // render={props => <ProductMix {...props} user={user} changeUser={changeUser} />}
        render={renderProps => <Main {...renderProps} />}
      />
    </Switch>

  );
}

export default withRouter(App);
