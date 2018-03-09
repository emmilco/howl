import React from 'react';

class ArticleTitleEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {title: this.props.title};
  }


  shouldComponentUpdate(nextProps, nextState){
    return nextProps.title !== this.state.title;
  }

  titleHandler(e){
    this.props.receiveTitle(
      {[this.props.id]: {title: e.target.innerText}}
    );
  }

  handleDelete(){
    return (e) => {
      if (e.key !== "Backspace"){
        return;
      } else if (e.target.innerText === "") {
        e.preventDefault();
      }
    };
  }

  render(){
    return (
      <div className="article_title_editor"
        onKeyup={this.handleDelete().bind(this)}
        contentEditable="true"
        onInput={this.titleHandler.bind(this)}
        id="article_title">{this.state.title}
      </div>
    );
  }
}

export default ArticleTitleEditor;
