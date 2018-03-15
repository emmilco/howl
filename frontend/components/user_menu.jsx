import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearMenu } from '../actions/ui_actions';

const UserMenu = (props) => {
  if (props.openState) {
    return (
      <div id="user_menu" onClick={props.clearMenu()}>
        <div id="popover-arrow"></div>
        <Link to='/articles/new'>New Article</Link>
        <Link to={`/users/${props.currentUser.id}`}>My Profile</Link>
        <Link to={`/settings`}>Settings</Link>
        <a onClick={() => props.logout()}>Sign out</a>
      </div>
    );
  }
  return <div></div>;
};

const mdp = (dispatch) => {
  return {
    clearMenu: () => dispatch(clearMenu())
  };
};

export default connect(null, mdp)(UserMenu);
