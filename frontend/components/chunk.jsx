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


  handleReturn(){
    return (e) => {
      if (e.key === "Enter"){
        document.getElementById(this.state.ord + 1).focus();
      }
    };
  }
  // componentDidMount(){
  //   document.getElementById(this.state.ord).focus();
  // }

  handleDelete(chunk){
    return (e) => {
      if (e.key !== "Backspace"){
        return;
      }
      if (e.target.innerText !== ""){
        this.props.receiveChunk({ [chunk.id]: {content: e.target.innerText}});
      } else {
        document.getElementById(this.state.ord - 1).focus();
        this.props.deleteChunk(chunk);

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
          onKeyDown={this.handleReturn().bind(this)}
          id={`${this.state.ord}`}
          className='chunk'>{this.state.content}
        </p>
      </div>
    );
  }

}

export default Chunk;
