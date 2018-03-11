import React from 'react';

import UserHeader from '../user_header';

class Comment extends React.Component {

  delete(){
    this.props.deleteComment(this.props.comment);
  }

  render(){
    return (
      <div className="comment">
        <div className="comment_header">
          <UserHeader
            user={this.props.author}
            date={this.props.comment.created_at}
            />
          { this.props.currentUser &&
            (this.props.author.id === this.props.currentUser.id &&
              <button onClick={this.delete.bind(this)}>delete</button>)
          }
        </div>
        <div className="comment_body">{this.props.comment.content}</div>
        <div className="commentFooter"></div>
      </div>);
  }
}

export default Comment;
