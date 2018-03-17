import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import FollowButton from '../follow_button';
import FollowersIndex from './followers_index';
import FolloweesIndex from './followees_index';

import { toggleMenu } from '../../actions/ui_actions';

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
    <div>
      <div>
        {props.menuState === "followees" && <FolloweesIndex user={props.user}/> }
        {props.menuState === "followers" && <FollowersIndex user={props.user}/> }
      </div>
      <div className="user_show_header">
        <div className="user_show_header_interior">
          <div className="user_header_info">
            <p className="user_name">{props.user.full_name}</p>
            {Boolean(props.date) &&
              <p className="date">{displayDate(props.date)}</p>}
            {Boolean(props.bio) &&
              <p className="user_bio">{props.bio}</p>}
          </div>
          <img className="avatar" src={props.user.avatar_url}/>
        </div>
        <div className="user_social_stats">
          <span onClick={props.showFollowees}
            className="user_followee_count">
            {props.user.subscription_count} Following
          </span>
          <span onClick={props.showFollowers}
            className="user_follower_count">
            {props.user.subscriber_count} Followers
          </span>
        </div>
        <FollowButton user={props.user} />
      </div>
    </div>
  );
};

const msp = (state) => {
  return {
    menuState: state.ui.menu
  };
};

const mdp = (dispatch) => {
  return {
    showFollowees: () => dispatch(toggleMenu("followees")),
    showFollowers: () => dispatch(toggleMenu("followers"))
  };
};

export default connect(msp, mdp)(UserShowHeader);
