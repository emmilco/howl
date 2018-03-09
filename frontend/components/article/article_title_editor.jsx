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

  render(){
    return (
      <div className="article_title_editor"
        contentEditable="true"
        onInput={this.titleHandler.bind(this)}
        id="article_title">{this.state.title}
      </div>
    );
  }
}

export default ArticleTitleEditor;
