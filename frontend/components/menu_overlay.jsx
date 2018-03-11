import React from 'react';
import { connect } from 'react-redux';

import { clearMenu } from '../actions/ui_actions';


const MenuOverlay = (props) => {
  if (props.menu) {
    return (
      <div id="menu_overlay" onClick={props.clearMenu}>
      </div>
    );
  }
  return null;
};

const msp = (state) => {
  return {
    menu: state.ui.menu,
  };
};

const mdp = (dispatch) => {
  return {
    clearMenu: () => dispatch(clearMenu())
  };
};

export default connect(msp, mdp)(MenuOverlay);
