import React from 'react';

const displayDate = (dateString) => {
  const dateObject = new Date(dateString);
  const isOld = (dateObject.getFullYear() - (new Date()).getFullYear()) > 1;

  let date = dateObject.toDateString();
  if (isOld) {
    date = date.slice(4);
  } else {
    date = date.slice(4, date.length - 4);
  }

  return date;
};

const ArticleAuthorHeader = (props) => {
    return (
    <div>
      <img className="avatar article_author_avatar"
        src={window.default_avatar_path}/>
      <p className="article_author_name">{props.author.full_name}</p>
      <p className="article_author_bio">{props.author.bio}</p>
      <p className="article_publish_date">
        {displayDate(props.date)}
      </p>
    </div>
  );
};

export default ArticleAuthorHeader;
