import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ModalOverlay from './modal_overlay';
import MenuOverlay from './menu_overlay';
import Header from './header';
import ArticleShow from './article/article_show';
import ArticleEdit from './article/article_edit';
import ArticleNew from './article/article_new';
import UserShow from './user/user_show';
import UserSettings from './user/user_settings';
import ContentManager from './user/content_manager';
import Homepage from './homepage';

const App = (props) => {
  return (
    <main>
      <ModalOverlay />
      <MenuOverlay />
      <Header />
      <Switch>
        <Route path="/articles/new" component={ArticleNew} />
        <Route path="/articles/:articleId/edit" component={ArticleEdit} />
        <Route path="/articles/:articleId" component={ArticleShow} />
        <Route path="/users/:userId" component={UserShow} />
        <Route path="/settings" component={UserSettings} />
        <Route path="/manage-content" component={ContentManager} />
        <Route path="/" component={Homepage} />
      </Switch>
    </main>
  );
};

export default App;
