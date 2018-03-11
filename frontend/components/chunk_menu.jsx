import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { displayForm, toggleMenu } from '../actions/ui_actions';


class ChunkMenu extends React.Component {

  render(){
    if (this.props.openState) {
      return (
        <div class="chunk_menu">
          <div id="popover-arrow-left"></div>
          <Link to='/articles/new'>New Article</Link>
          <a onClick={() => this.props.logout()}>Sign out</a>

        </div>
      );
    }
    return <div></div>;
  }
}

const msp = (state, ownProps) => {
  const chunkId = ownProps.chunk.id;
  return {
    openState: state.ui.menu === `chunk_${chunkId}`,
  };
};

const mdp = (dispatch) => {
  return {
    displayForm: (form) => dispatch(displayForm(form)),
    toggleMenu: (menu, e) => {
      e.stopPropagation();
      dispatch(toggleMenu(menu));
    }
  };
};

export default connect(msp, null)(ChunkMenu);
