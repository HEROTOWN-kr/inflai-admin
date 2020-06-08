import React, { useEffect, useState } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

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

  /*useEffect(() => {
    user.token ? props.history.push('/Main/Advertiser') : props.history.push('/Login');
  }, [user]);*/


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
    </Switch>
  );
}

export default withRouter(App);
