import React from 'react';

import UserHeader from '../user_header';

const ArticleFooter = (props) => {
  return (
    <div>
      <UserHeader
        user={props.author}
        bio={props.author.bio}
        date={props.article.publish_date}/>
    </div>
  );
};

export default ArticleFooter;
