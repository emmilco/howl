import React from 'react';

class CommentBody extends React.Component {
  render(){
    return (
      <div className="comment_body">
        {this.props.content}
      </div>);
  }
}

export default Comment;
