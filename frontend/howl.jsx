import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store.js';
import Root from './components/root';

// IMPORTS FOR TESTING

import * as SessionAPIUtil from './util/session_api_util';
import * as ArticlesAPIUtil from './util/articles_api_util';

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

  window.fetchArticle = ArticlesAPIUtil.fetchArticle;

  // END TESTING


  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);

});
