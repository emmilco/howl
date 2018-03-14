import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { displayForm, toggleMenu, clearMenu } from '../actions/ui_actions';
import { receiveChunk } from '../actions/chunk_actions';
import ImageUploadMenu from './image_upload_menu';


class ChunkMenu extends React.Component {
  constructor(props){
    super(props);
    this.buttonHandler = this.buttonHandler.bind(this);
    this.dividerButtonHandler = this.dividerButtonHandler.bind(this);
  }

  buttonHandler(e){
    this.props.receiveChunk(
      { [this.props.chunk.id]: {content_type: e.target.innerText}}
    );
    this.props.clearMenu();
    e.stopPropagation();
    document.getElementById(this.props.chunk.ord).focus();
  }

  dividerButtonHandler(e){
    this.props.receiveChunk(
      { [this.props.chunk.id]: {
        content_type: "divider"
      }}
    );
    this.props.clearMenu();
    e.stopPropagation();
    const keyEvent = new KeyboardEvent("keydown", {key : "Enter"});
    document.getElementById(this.props.chunk.ord).dispatchEvent(keyEvent);
    console.log("here!");
    document.getElementById(`${this.props.chunk.ord + 1}`).focus();
  }

  render(){
    const chunkId = this.props.chunk.id;
    if (this.props.openState) {
      return (
        <div class="chunk_menu">
          <div id="popover-arrow-left"></div>
          <button onClick={this.buttonHandler}>h1</button>
          <button onClick={this.buttonHandler}>h2</button>
          <button onClick={this.dividerButtonHandler}>—</button>
          <button onClick={this.buttonHandler}>quote</button>
          <div id="image_upload_container"
            onClick={(e) => this.props.toggleMenu(`image_${chunkId}`, e)}>
            <img id="image_upload_button" src={window.image_icon_path} />
            <ImageUploadMenu chunk={this.props.chunk} />
          </div>
        </div>
      );
    }
    return <div></div>;
  }
}


const msp = (state, ownProps) => {
  const chunkId = ownProps.chunk.id;
  return {
    openState: [`chunk_${chunkId}`, `image_${chunkId}`].includes(state.ui.menu),
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
