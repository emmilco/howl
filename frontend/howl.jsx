import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store.js';
import Root from './components/root';

// IMPORTS FOR TESTING

import * as SessionAPIUtil from './util/session_api_util';

// END TESTING

document.addEventListener('DOMContentLoaded', () => {

  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser}};
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // TESTING

  window.signup = SessionAPIUtil.signup;
  window.login = SessionAPIUtil.login;
  window.logout = SessionAPIUtil.logout;

  // END TESTING


  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);

});
