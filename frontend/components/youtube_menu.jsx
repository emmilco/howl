import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { displayForm, toggleMenu, clearMenu } from '../actions/ui_actions';
import { receiveChunk, updateChunk } from '../actions/chunk_actions';


class YouTubeMenu extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.parseYTLink = this.parseYTLink.bind(this);
    this.state = {url: ""};
  }

  handleChange(e){
    this.setState({url: e.clipboardData.getData("text/plain")});
  }

  handleSubmit(e) {
    this.props.receiveChunk({
      [this.props.chunk.id]: {
        youtube_url: this.parseYTLink(),
        content_type: "mov",
        content: " "
      }
    });
    this.props.clearMenu();
    document.getElementById(this.props.chunk.ord).focus();
  }

  parseYTLink(){
    let videoId = this.state.url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if(ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
    return videoId;
  }

  render(){
    if (this.props.openState) {
      return (
        <div class="youtube_menu">
          <form onSubmit={this.handleSubmit}>
            <input type="text" onPaste={this.handleChange}
              placeholder="Enter a YouTube video link..."></input>
            <button>Add Video</button>
          </form>
        </div>
      );
    }
    return <div></div>;
  }
}

const msp = (state, ownProps) => {
  const chunkId = ownProps.chunk.id;
  return {
    openState: state.ui.menu === `mov_${chunkId}`,
  };
};

const mdp = (dispatch) => {
  return {
    updateChunk: (formData, id) => dispatch(updateChunk(formData, id)),
    clearMenu: () => dispatch(clearMenu()),
    receiveChunk: (chunk) => dispatch(receiveChunk(chunk)),
    displayForm: (form) => dispatch(displayForm(form)),
    toggleMenu: (menu, e) => {
      e.stopPropagation();
      dispatch(toggleMenu(menu));
    }
  };
};

export default connect(msp, mdp)(YouTubeMenu);
