import React from 'react';

import UserHeader from '../user_header';
import FollowButton from '../follow_button';

const ArticleHeader = (props) => {
  return (
    <div>
      <div id="article_author_header">
        <UserHeader
          user={props.author}
          bio={props.author.bio}
          date={props.article.publish_date}/>

        <FollowButton user={props.author} />
      </div>
      { Boolean(props.article.header_image) && <ArticleHeaderImage /> }
      <h1 id="article_title">{props.article.title}</h1>
    </div>
  );
};

export default ArticleHeader;
