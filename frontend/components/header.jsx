import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { displayForm, toggleMenu } from '../actions/ui_actions';
import { login } from '../actions/session_actions';
import UserMenu from './user_menu';

const Header = (props) => {
  return (
    <header id="main_header">
      <Link to="/" id="header_logo" >
        <img src="/assets/howl_logo.svg" />
      </Link>
      <ul id="header_control_panel">

        { Boolean(props.currentUser) ||
          <div>
            <button id="login_button"
              onClick={() => props.displayForm("login")}>Sign in</button>
            <button id="signup_button"
              onClick={() => props.displayForm("signup")}>Get started</button>
            <button id="guest_login_button"
              onClick={() => props.login({email: "demo@us.er", password: "password"})}>Guest</button>
          </div>
        }

        { Boolean(props.currentUser) &&
          <div
            onClick={() => props.toggleMenu("userMenu")}>
            <img id="user_menu_button" src="/assets/howl_default_avatar.svg" />
            <UserMenu openState={props.userMenuState}/>
          </div>
        }

        { Boolean()}


      </ul>
    </header>
  );
};

const msp = (state) => {
  return {
    currentUser: state.session.currentUser,
    userMenuState: state.ui.userMenu
  };
};

const mdp = (dispatch) => {
  return {
    displayForm: (form) => dispatch(displayForm(form)),
    login: (user) => dispatch(login(user)),
    toggleMenu: (menu) => dispatch(toggleMenu(menu))
  };
};



export default connect(msp, mdp)(Header);
