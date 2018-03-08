import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ModalOverlay from './modal_overlay';
import Header from './header';
import ArticleShow from './article/article_show';
import ArticleEdit from './article/article_edit';

const App = () => {
  return (
    <main>
      <ModalOverlay />
      <Header />
      <Switch>
        <Route path="/articles/:articleId" component={ArticleShow} />
        <Route path="/articles/:articleId/:edit" component={ArticleShow} />
      </Switch>
    </main>
  );
};

export default App;
