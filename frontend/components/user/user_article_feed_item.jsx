import React from 'react';
import { Link } from 'react-router-dom';

import UserHeader from '../user_header';

class UserArticleFeedItem extends React.Component {
  render(){
    const article = this.props.article;
    return (
      <div className="article_feed_item" id={`art_${article.id}`}>
        <UserHeader
          user={this.props.user}
          date={this.props.user.created_at}/>
        <Link to={`/articles/${article.id}`}>
          <div className="article_feed_title">{article.title}</div>
          { Boolean(article.header_image_url) &&
            <img className="article_feed_image" src={article.header_image_url} />
          }
          <div className="article_feed_date">{article.date}</div>
          <div className="article_feed_lead_text">{article.lead_text}</div>
        </Link>
        <Link className="read_more" to={`/articles/${article.id}`}>
          Read more...
        </Link>
        <div className="article_feed_footer">
          <div className="howl_button">
          </div>
          {article.comments_count > 1 &&
            <div className="comments_count">{article.comments_count} responses</div>
          }
        </div>
      </div>
    );
  }
}

export default UserArticleFeedItem;
