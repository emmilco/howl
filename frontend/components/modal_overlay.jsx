import React from 'react';
import { connect } from 'react-redux';

import { removeForm } from '../actions/ui_actions';
import SignupFormContainer from './signup_form_container';
import LoginFormContainer from './login_form_container';

const ModalOverlay = (props) => {
  return (
    <div id="modal_container">
      { (props.form === "signup") && <SignupFormContainer />}
      { (props.form === "login") && <LoginFormContainer />}
      { props.form &&
        <div id="modal_overlay" onClick={props.removeForm}></div> }
    </div>
  );
};

const msp = (state) => {
  return {
    form: state.ui.form,
    sessionErrors: state.errors.session
  };
};

const mdp = (dispatch) => {
  return {
    removeForm: () => dispatch(removeForm())
  };
};

export default connect(msp, mdp)(ModalOverlay);
