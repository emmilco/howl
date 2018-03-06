import { connect } from 'react-redux';

import SessionForm from './session_form';
import { signup } from '../actions/session_actions';


const msp = (state) => {
  return {
    header: "Join Howl.",
    blurb: "Create an account to publish articles,\
      follow your favorite writers, and join the conversation.",
    buttonText: "Sign up.",
    formType: "signup"
  };
};

const mdp = (dispatch) => {
  return {
    submitForm: (user) => dispatch(signup(user)),
  };
};

export default connect(msp, mdp)(SessionForm);
