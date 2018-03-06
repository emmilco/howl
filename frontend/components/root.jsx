import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

const Root = ({ store }) => (
  <Provider store={ store }>
    <HashRouter>
      <h1>WELCOME TO GROWL!</h1>
    </HashRouter>
  </Provider>
);

export default Root;
