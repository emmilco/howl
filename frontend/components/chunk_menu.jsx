import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { displayForm, toggleMenu, clearMenu } from '../actions/ui_actions';
import { receiveChunk } from '../actions/chunk_actions';


class ChunkMenu extends React.Component {
  constructor(props){
    super(props);
    this.buttonHandler = this.buttonHandler.bind(this);
  }

  buttonHandler(e){
    this.props.receiveChunk(
      { [this.props.chunk.id]: {content_type: e.target.innerText}}
    );
    this.props.clearMenu();
    e.stopPropagation();
    document.getElementById(this.props.chunk.ord).focus();
  }

  render(){
    if (this.props.openState) {
      return (
        <div class="chunk_menu">
          <div id="popover-arrow-left"></div>
          <button onClick={this.buttonHandler}>h1</button>
          <button onClick={this.buttonHandler}>h2</button>
          <button onClick={this.buttonHandler}>img</button>
          <button onClick={this.buttonHandler}>—</button>
          <button onClick={this.buttonHandler}>“ ”</button>

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
    clearMenu: () => dispatch(clearMenu()),
    receiveChunk: (chunk) => dispatch(receiveChunk(chunk)),
    displayForm: (form) => dispatch(displayForm(form)),
    toggleMenu: (menu, e) => {
      e.stopPropagation();
      dispatch(toggleMenu(menu));
    }
  };
};

export default connect(msp, mdp)(ChunkMenu);
