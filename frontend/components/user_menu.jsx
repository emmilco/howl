import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearMenu } from '../actions/ui_actions';

const UserMenu = (props) => {
  if (props.openState) {
    return (
      <div id="user_menu">
        <div onClick={props.clearMenu} id="popover-arrow"></div>
        <Link onClick={props.clearMenu} to='/articles/new'>New Article</Link>
        <Link onClick={props.clearMenu} to={`/users/${props.currentUser.id}`}>My Profile</Link>
        <Link onClick={props.clearMenu} to='/manage-content'>Manage Articles</Link>
        <div className="user_menu_divider"></div>
        <Link onClick={props.clearMenu} to={`/settings`}>Settings</Link>
        <a onClick={() => props.logout()}>Sign out</a>
      </div>
    );
  }
  return <div></div>;
};

const mdp = (dispatch) => {
  return {
    clearMenu: (e) => {
      dispatch(clearMenu());
      e.stopPropagation();
    }
  };
};

export default connect(null, mdp)(UserMenu);
