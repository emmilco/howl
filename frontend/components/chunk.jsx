import React from 'react';
import ReactDOM from 'react-dom';


class Chunk extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props.chunk;
  }

  handleChange(chunkId){
    return (e) => {
      if (e.nativeEvent.inputType === "insertText"){
        this.props.receiveChunk({ [chunkId]: {content: e.target.innerText}});
      }
    };
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.chunk.content !== this.state.content;
  }

  handlePaste(e){
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  }

  handleDelete(chunk){
    return (e) => {
      if (e.key !== "Backspace"){
        return;
      }
      if (e.target.innerText !== "" || this.props.chunkCount === 1){
        this.props.receiveChunk({ [chunk.id]: {content: e.target.innerText}});
      } else if (this.state.ord > 0) {
        this.props.deleteChunk(chunk).then(
          () => document.getElementById(this.state.ord - 1).focus()
        );
      } else {
        this.props.deleteChunk(chunk).then(
          () => document.getElementById(this.state.ord).focus()
        );
      }
    };
  }

  render(){
    const content = this.state.content;
    const type = this.state.content_type;
    return (
      <div className={`chunk_${type}`}>
        <p contentEditable={this.props.edit}
          onInput={this.handleChange(this.state.id).bind(this)}
          onKeyUp={this.handleDelete(this.state).bind(this)}
          onPaste={this.handlePaste}
          id={`${this.props.chunk.ord}`}
          className='chunk'>{this.state.content}
        </p>
      </div>
    );
  }

}

export default Chunk;
