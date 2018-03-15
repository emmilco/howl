import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import ChunkMenu from './chunk_menu';
import { displayForm, toggleMenu } from '../actions/ui_actions';
import { receiveChunk, deleteChunk } from '../actions/chunk_actions';

class Chunk extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props.chunk;
    this.handlePaste = this.handlePaste.bind(this);
    this.handleCut = this.handleCut.bind(this);
    this.handleKeystroke = this.handleKeystroke.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    return (nextProps.chunk.content !== this.state.content ||
    nextProps.chunk.content_type !== this.state.content_type);
  }

  handlePaste(e){
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
    this.props.receiveChunk({ [this.state.id]: {content: e.target.innerText}});
  }

  handleCut(e){
    this.props.receiveChunk({ [this.state.id]: {content: e.target.innerText}});
  }

  placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection !== undefined
      && typeof document.createRange !== undefined) {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange !== undefined) {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  }

  handleKeystroke(e){
    if (e.key !== "Backspace"){
      this.props.receiveChunk({
        [this.state.id]: {content: e.target.innerText}
      });
      return;
    }

    const chunk = this.state;
    if (this.props.chunkCount === 1 && e.target.innerText === "") {
      this.props.receiveChunk({ [chunk.id]: {content_type: "p", content: ""}});
    } else if (e.target.innerText !== ""){
      this.props.receiveChunk({ [chunk.id]: {content: e.target.innerText}});
    } else if (chunk.ord > 0 || "mov" === chunk.content_type) {
      this.props.deleteChunk(chunk).then(() => {
        const previous = document.getElementById(chunk.ord - 1);
        previous.focus();
        this.placeCaretAtEnd(previous);
        }
      );
    } else {
      this.props.deleteChunk(chunk).then(
        () => document.getElementById(chunk.ord).focus()
      );
    }
  }

  handleMenuClick(e){
    this.props.toggleMenu(`chunk_${this.props.chunk.id}`, e);
  }

  render(){
    const content = this.state.content;
    const type = this.props.chunk.content_type;
    return (
      <div className={`chunk_${type}`}>
        {(this.props.chunk.content === "" && type === "p") &&
          <div tabIndex="-1" className="chunk_menu_container"
            onClick={this.handleMenuClick}>
            <ChunkMenu chunk={this.props.chunk}/>
          </div>
        }
        {type === "img" && <img src={this.props.chunk.image_url} />}
        {type === "mov" &&
          <div>
            <iframe width="560" height="315"
              src={`https://www.youtube.com/embed/${this.props.chunk.youtube_url}`}
              frameborder="0" allow="encrypted-media"
              allowfullscreen>
            </iframe>
          </div>
        }
        <p contentEditable={this.props.edit}
          onKeyUp={this.handleKeystroke}
          onPaste={this.handlePaste}
          onCut={this.handleCut}
          id={`${this.props.chunk.ord}`}
          className={`chunk ${type}`}>{this.state.content}
        </p>
      </div>
    );
  }

}


const mdp = (dispatch) => {
  return {
    receiveChunk: (chunk) => dispatch(receiveChunk(chunk)),
    deleteChunk: (chunk) => dispatch(deleteChunk(chunk)),
    displayForm: (form) => dispatch(displayForm(form)),
    toggleMenu: (menu, e) => {
      e.stopPropagation();
      dispatch(toggleMenu(menu));
    }
  };
};

export default connect(null, mdp)(Chunk);
