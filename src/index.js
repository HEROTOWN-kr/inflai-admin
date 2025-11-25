import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './css/common.scss';

/* export default (() => {
  if (!global || !global._babelPolyfill) {
    require('babel-polyfill');
  }
})(); */

import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
));


if (module.hot) {
  module.hot.accept();
}
