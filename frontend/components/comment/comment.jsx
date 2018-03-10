import React from 'react';

import CommentBody from './comment_body';
import UserHeader from '../user_header';

class Comment extends React.Component {
  render(){
    return (
      <div className="comment">
        <UserHeader
          user={this.props.author}
          date={this.props.comment.created_at}
          />
        <div className="comment_body">{this.props.comment.content}</div>
        <div className="commentFooter"></div>
      </div>);
  }
}

export default Comment;
