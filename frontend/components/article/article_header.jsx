import React from 'react';

import ArticleAuthorHeader from './article_author_header';

const ArticleHeader = (props) => {
  return (
    <div>
      <ArticleAuthorHeader
        author={props.author}
        date={props.article.publish_date}/>

      { Boolean(props.article.header_image) && <ArticleHeaderImage /> }

      <h1 id="article_title">{props.article.title}</h1>
    </div>
  );
};

export default ArticleHeader;
