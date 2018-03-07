import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ModalOverlay from './modal_overlay';
import Header from './header';
import ArticleShow from './article/article_show';

const App = () => {
  return (
    <main>
      <ModalOverlay />
      <Header />
      <Switch>
        <Route path="/articles/:articleId" component={ArticleShow} />
      </Switch>
    </main>
  );
};

export default App;
