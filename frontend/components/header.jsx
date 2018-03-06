import React from 'react';
import { connect } from 'react-redux';

import { displayForm } from '../actions/ui_actions';

const Header = (props) => {
  return (
    <header id="main_header">
      <img id="header_logo" src="/assets/howl_logo.svg" />
      <ul id="header_control_panel">
        { Boolean(props.currentUser) || <button id="login_button"
          onClick={() => props.displayForm("login")}>Sign in</button> }
        { Boolean(props.currentUser) || <button id="signup_button"
          onClick={() => props.displayForm("signup")}>Get started</button> }

        { Boolean(props.currentUser) && <img id="user_menu_button"
          src="/assets/howl_default_avatar.svg" /> }
      </ul>
    </header>
  );
};

const msp = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mdp = (dispatch) => {
  return {
    displayForm: (form) => dispatch(displayForm(form))
  };
};



export default connect(msp, mdp)(Header);
