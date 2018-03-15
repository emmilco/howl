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

class ContentManagerFeedItem extends React.Component {
  render(){
    const article = this.props.article;
    return (
      <div className="content_manager_feed_item" id={`art_${article.id}`}>
        <Link to={`/articles/${article.id}/edit`}>
          <div className="article_feed_title">
            { Boolean(article.title) && article.title }
            { Boolean(article.title) || "Untitled" }
          </div>
          <div className="article_published_status">
            { Boolean(article.published) && "Published" }
            { Boolean(article.published) || "Draft" }
          </div>
          <div className="article_feed_date">
            { Boolean(article.publish_date) && displayDate(article.publish_date)}
          </div>
          <div className="article_feed_lead_text">
            { Boolean(article.lead_text) && (article.lead_text.slice(0,70) + "...")}
          </div>
        </Link>
        <button onClick={() => this.props.deleteArticle(article.id)}>
          Delete
        </button>
      </div>
    );
  }
}

export default ContentManagerFeedItem;
