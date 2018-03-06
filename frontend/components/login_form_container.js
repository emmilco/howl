import { connect } from 'react-redux';

import SessionForm from './session_form';
import { login } from '../actions/session_actions';


const msp = (state) => {
  return {
    header: "Welcome back.",
    blurb: "Sign in to access your personalized homepage,\
      read your favorite articles, and join the conversation.",
    buttonText: "Sign in."
  };
};

const mdp = (dispatch) => {
  return {
    submitForm: (user) => dispatch(login(user)),
  };
};

export default connect(msp, mdp)(SessionForm);
