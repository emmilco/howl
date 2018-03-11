import React from 'react';

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

const UserHeader = (props) => {
  debugger
  return (
    <div className="user_header">
      <img className="avatar"
        src={window.default_avatar_path}/>
      <div className="user_header_info">
        <p className="user_name">{props.user.full_name}</p>
        {Boolean(props.bio) &&
          <p className="user_bio">{props.bio}</p>}
        {Boolean(props.status) &&
          <p className="publication_status">{props.status}</p>}
        {Boolean(props.date) &&
          <p className="date">{displayDate(props.date)}</p>}
      </div>
    </div>
  );
};

export default UserHeader;
