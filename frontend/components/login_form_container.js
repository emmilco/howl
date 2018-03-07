import { connect } from 'react-redux';

import SessionForm from './session_form';
import { login } from '../actions/session_actions';


const msp = (state) => {
  return {
    header: "Welcome back.",
    blurb: "Sign in to access your personalized homepage,\
      write a new article, or catch up on some reading.",
    buttonText: "Sign in."
  };
};

const mdp = (dispatch) => {
  return {
    submitForm: (user) => dispatch(login(user)),
  };
};

export default connect(msp, mdp)(SessionForm);
