import React from 'react';
import { connect } from 'react-redux';

import { removeForm } from '../actions/ui_actions';
import SignupForm from './signup_form';
import LoginForm from './login_form';


const ModalOverlay = (props) => {
  return (
    <div>
      { props.form &&
        <div onClick={props.removeForm} id="modal_overlay"></div> }
      { (props.form === "signup") && <SignupForm />}
      { (props.form === "login") && <LoginForm />}
    </div>
  );
};

const msp = (state) => {
  return {
    form: state.ui.form
  };
};

const mdp = (dispatch) => {
  return {
    removeForm: () => dispatch(removeForm())
  };
};

export default connect(msp, mdp)(ModalOverlay);
