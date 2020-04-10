import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Main from './main/Main';
import Login from './login/Login';


function App(props) {
  const [user, setUser] = useState({});

  function loginUser() {
    setUser({ token: 'token' });
  }


  return (
    <div>
      {
          user.token ? <Main /> : <Login loginUser={loginUser} />
      }
    </div>
  );
}

export default withRouter(App);
