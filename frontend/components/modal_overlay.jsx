import React from 'react';
import { connect } from 'react-redux';

import { removeForm } from '../actions/ui_actions';


const ModalOverlay = (props) => {
  return (
    <div
      onClick={props.removeForm}
      id="modal_overlay"
      className={props.form ? "visible" : "hidden"}
    ></div>
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
