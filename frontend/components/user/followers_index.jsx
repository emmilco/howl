import React from 'react';
import { connect } from 'react-redux';

import UserHeader from '../user_header';
import FollowButton from '../follow_button';

import { fetchFollowers } from '../../actions/user_actions';
import { selectFollowers } from '../../reducers/selectors';
import { clearMenu } from '../../actions/ui_actions';

class FollowersIndex extends React.Component {

  componentDidMount(){
    this.props.fetchFollowers(this.props.user.id);
  }

  render(){
    if (!this.props.users) {
      return <div></div>;
    }
    return (
      <div onClick={() => this.props.clearMenu()}
        className="follow_index_overlay">
        <div className="follow_index">
          <h2 className="follow_header">Followers</h2>
          {this.props.users.map((user) => {
            return (
              <div className="follow_index_item">
                <UserHeader bio={user.bio} user={user} />
                <FollowButton user={user} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  const userId = ownProps.user.id;
  return {
    users: selectFollowers(state, userId),
  };
};

const mdp = (dispatch) => {
  return {
    fetchFollowers: (id) => dispatch(fetchFollowers(id)),
    clearMenu: () => dispatch(clearMenu())
  };
};

export default connect(msp, mdp)(FollowersIndex);
