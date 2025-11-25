import { createContext } from 'react';

function noop() {}

const AuthContext = createContext({
  isLoading: false,
  setLoading: noop
});

export default AuthContext;
