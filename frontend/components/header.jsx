import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';

import { displayForm, toggleMenu } from '../actions/ui_actions';
import { login, logout } from '../actions/session_actions';
import UserMenu from './user_menu';
import PublishButton from './article/publish_button';

const Header = (props) => {
  return (
    <header id="main_header">
      <Link to="/" id="header_logo" >
        <img src={window.howl_logo_path} />
      </Link>
      <ul id="header_control_panel">

        { Boolean(props.currentUser) ||
          <div>
            <button id="login_button"
              onClick={() => props.displayForm("login")}>Sign in
            </button>
            <button id="signup_button"
              onClick={() => props.displayForm("signup")}>Get started
            </button>
            <button id="guest_login_button"
              onClick={() => props.login({email: "demo@us.er", password: "password"})}>Demo
            </button>
          </div>
        }

        { Boolean(props.currentUser) &&
          <div className="user_menus">
            <Route path='/articles/:id/edit' component={PublishButton} />
            <div
              onClick={(e) => props.toggleMenu("userMenu", e)}>
              <img id="user_menu_button" src={window.default_avatar_path} />
              <UserMenu
                currentUser={props.currentUser}
                logout={props.logout}
                openState={props.userMenuState}/>
            </div>
          </div>
        }

      </ul>
    </header>
  );
};

const msp = (state) => {
  return {
    currentUser: state.session.currentUser,
    userMenuState: state.ui.menu === "userMenu"
  };
};

const mdp = (dispatch) => {
  return {
    displayForm: (form) => dispatch(displayForm(form)),
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout()),
    toggleMenu: (menu, e) => {
      e.stopPropagation();
      dispatch(toggleMenu(menu));
    }
  };
};



export default withRouter(connect(msp, mdp)(Header));
