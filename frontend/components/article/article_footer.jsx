import React from 'react';

import ArticleAuthorHeader from './article_author_header';

const ArticleFooter = (props) => {
  return (
    <div>
      <ArticleAuthorHeader
        author={props.author}
        date={props.article.publish_date}/>
    </div>
  );
};

export default ArticleFooter;
