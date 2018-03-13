import React from 'react';
import { connect } from 'react-redux';

import { followUser, unfollowUser } from '../actions/user_actions';

class FollowButton extends React.Component {
  constructor(props){
    super(props);
    this.followHandler = this.followHandler.bind(this);
    this.followStatus = this.followStatus.bind(this);
  }

  followHandler() {
    if (this.props.user.following) {
      this.props.unfollowUser(this.props.user.id);
    } else {
      this.props.followUser(this.props.user.id);
    }
  }

  followStatus(){
    if (this.props.user.following) {
      return "Following";
    } else {
      return "Follow";
    }  }

  render(){
    if (!this.props.currentUser ||
        this.props.user.id === this.props.currentUser.id) {
      return <div></div>;
    }
    return (
      <button
        className={this.followStatus()}
        onClick={this.followHandler}>
        {this.followStatus()}
      </button>
    );
  }
}

const msp = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mdp = (dispatch) => {
  return {
    followUser: (userId) => dispatch(followUser(userId)),
    unfollowUser: (userId) => dispatch(unfollowUser(userId))
  };
};

export default connect(msp,mdp)(FollowButton);
