import React from 'react';
import { connect } from 'react-redux';

import UserHeader from '../user_header';
import FollowButton from '../follow_button';

import { fetchFollowees } from '../../actions/user_actions';
import { selectFollowees } from '../../reducers/selectors';
import { clearMenu } from '../../actions/ui_actions';

class FolloweesIndex extends React.Component {

  componentDidMount(){
    this.props.fetchFollowees(this.props.user.id);
  }

  render(){
    if (!this.props.users) {
      return <div></div>;
    }
    return (
      <div onClick={() => this.props.clearMenu()}
        className="follow_index_overlay">
        <div className="follow_index">
          <h2 className="follow_header">Followees</h2>
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
    users: selectFollowees(state, userId),
  };
};

const mdp = (dispatch) => {
  return {
    fetchFollowees: (id) => dispatch(fetchFollowees(id)),
    clearMenu: () => dispatch(clearMenu())
  };
};

export default connect(msp, mdp)(FolloweesIndex);
