import React from 'react';
import { Link } from 'react-router-dom';

const displayDate = (dateString) => {
  const dateObject = new Date(dateString);
  const isOld = ((new Date()).getFullYear()) - dateObject.getFullYear() > 1;
  let date = dateObject.toDateString();
  if (isOld) {
    date = date.slice(4);
  } else {
    date = date.slice(4, date.length - 4);
  }
  return date;
};

class HomepageFeedItem extends React.Component {

  render(){
    const article = this.props.article;
    return (
      <div className="article_feed_item" id={`art_${article.id}`}>
        <div className="article_info_container">
          <Link to={`/articles/${article.id}`}>
            <div className="article_feed_title">
              {article.title}
            </div>
            <div className="article_feed_lead_text">
              {article.lead_text.slice(0,110) + "..."}
            </div>
            <div className="article_feed_author">
              {this.props.user.full_name}
            </div>
            <div className="article_feed_date">
              {displayDate(article.publish_date)}
            </div>
          </Link>
        </div>
        <Link to={`/articles/${article.id}`}>
          { Boolean(article.header_image_url) &&
            <img className="article_feed_image" src={article.header_image_url} />
          }
        </Link>
      </div>
    );
  }
}

export default HomepageFeedItem;
