import React from 'react';

import UserHeader from '../user_header';
import HowlButton from '../howl_button';

const ArticleFooter = (props) => {
  return (
    <div className="article_show_footer">
      <div className="article_howl_footer">
        <p>Did you like this article? Hold down the button and make your
        voice heard!</p>
        <HowlButton likeable={props.article} likeable_type="article" />
      </div>
      <UserHeader
        user={props.author}
        bio={props.author.bio}
        date={props.article.publish_date}/>
    </div>
  );
};

export default ArticleFooter;
