import React from 'react';

import UserHeader from '../user_header';
import ArticleTitleEditor from './article_title_editor';

import ArticleShow from './article_show';


class ArticleEdit extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <ArticleShow edit={true}/>
    );
  }

}

export default ArticleEdit;
