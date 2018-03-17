import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { displayForm, toggleMenu, clearMenu } from '../actions/ui_actions';
import { receiveChunk, updateChunk } from '../actions/chunk_actions';

class ImageUploadMenu extends React.Component {
  constructor(props){
    super(props);
    this.updateFile = this.updateFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {imageFile: null, imageUrl: null};
  }

  handleSubmit(e) {
    const file = this.state.imageFile;
    const formData = new FormData();
    if (file){
      formData.append("chunk[image]", file);
    }
    this.props.updateChunk(formData, this.props.chunk.id);
    this.props.clearMenu();
  }

  updateFile(e){
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = function () {
      this.setState({ imageFile: file, imageUrl: fileReader.result });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  render(){
    if (this.props.openState) {
      return (
        <div class="image_upload_menu">
          <form onSubmit={this.handleSubmit}>
            <label className="file_container">
              <button>Choose File</button>
              <input
                type="file"
                onChange={this.updateFile}
                accept="image/*">
              </input>
            </label>
            <button>Submit</button>
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
    openState: state.ui.menu === `image_${chunkId}`,
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

export default connect(msp, mdp)(ImageUploadMenu);
