import React from 'react';

import UserHeader from '../user_header';

class CommentForm extends React.Component {
  constructor(props){
    super(props);
    this.commentText = "";
  }

  handleInput(e){
    this.commentText = e.currentTarget.innerText;
  }

  handlePaste(e){
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  }

  handleSubmit(e){
    if (this.commentText === "") { return; }
    const comment = {
      content: this.commentText,
      article_id: this.props.articleId,
      author_id: this.props.currentUser.id
    };
    this.props.createComment(comment);
    document.getElementById("comment_form_input").innerText = "";
    this.commentText = "";
    this.displayForm = false;
  }

  render(){
    if (!this.props.currentUser) {
      return <div></div>; }
    return (
      <div className="comment comment_form_container">
        <UserHeader
          user={this.props.currentUser}
          />
        <div
          id="comment_form_input"
          className="comment_body"
          contentEditable="true"
          onPaste={this.handlePaste}
          onInput={this.handleInput.bind(this)}>
        </div>
        <div className="comment_footer">
          <button onClick={this.handleSubmit.bind(this)}>Publish</button>
        </div>
      </div>
    );
  }
}

export default CommentForm;
