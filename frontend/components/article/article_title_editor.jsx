import React from 'react';

class ArticleTitleEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {title: this.props.title};
  }

  handleReturn(e){
    if (e.key === "Enter"){
      e.preventDefault();
      document.getElementById(0).focus();
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.title !== this.state.title;
  }

  titleHandler(e){
    this.props.receiveTitle(
      {[this.props.id]: {title: e.target.innerText}}
    );
  }

  render(){
    return (
      <div className="article_title_editor"
        contentEditable="true"
        onInput={this.titleHandler.bind(this)}
        onKeyDown={this.handleReturn}
        id="article_title">{this.state.title}
      </div>
    );
  }
}

export default ArticleTitleEditor;
