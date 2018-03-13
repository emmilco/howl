import React from 'react';

import HomepageFeedItem from './homepage_feed_item';

const HomepageTopArticles = (props) => {
  if (props.articles.length === 0) {return null;}
  return (
    <div id="homepageTopArticles">
      <div className="top_1">
        <HomepageFeedItem
          user={props.users[0]}
          article={props.articles[0]}/>
      </div>

      <div className="top_2">
        <HomepageFeedItem
          user={props.users[1]}
          article={props.articles[1]}/>
      </div>

      <div className="top_2">
        <HomepageFeedItem
          user={props.users[2]}
          article={props.articles[2]}/>
      </div>

      <div className="top_2">
        <HomepageFeedItem
          user={props.users[3]}
          article={props.articles[3]}/>
          </div>

      <div className="top_2">
        <HomepageFeedItem
          user={props.users[4]}
          article={props.articles[4]}/>
      </div>

    </div>
  );
};

export default HomepageTopArticles;
