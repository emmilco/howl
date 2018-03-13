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

  return "Howl member since " + date;
};

const UserShowHeader = (props) => {
  return (
    <div className="user_show_header">
      <div className="user_show_header_interior">
        <div className="user_header_info">
          <p className="user_name">{props.user.full_name}</p>
          {Boolean(props.date) &&
            <p className="date">{displayDate(props.date)}</p>}
          {Boolean(props.bio) &&
            <p className="user_bio">{props.bio}</p>}
        </div>
        <img className="avatar"
          src={props.user.avatar_url}/>
      </div>
      <div className="user_social_stats">
        <span className="user_followee_count">Following</span>
        <span className="user_follower_count">Followers</span>
      </div>
    </div>
  );
};

export default UserShowHeader;
