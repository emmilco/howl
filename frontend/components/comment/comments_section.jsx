import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Comment from './comment';
import CommentForm from './comment_form';

import {
  fetchArticleComments,
  createComment,
  updateComment,
  deleteComment
} from '../../actions/comment_actions';

import {
  selectArticleComments,
  selectArticleCommentAuthors
} from '../../reducers/selectors';

class CommentsSection extends React.Component {

  componentDidMount(){
    this.props.fetchArticleComments(this.props.articleId);
  }

  render(){
    return (
      <div id="comments_section">
        <div className="comments_feed">
          <p id="comments_section_header">Responses</p>
          <CommentForm
            articleId={this.props.articleId}
            createComment={this.props.createComment}
            currentUser={this.props.currentUser}
            />
          {this.props.comments.length === 0 &&
            <div id="no_comments">No comments yet!</div>}
          {this.props.comments.map((comment) => {
            if (!comment) { return; }
            return (
              <Comment
                currentUser={this.props.currentUser}
                comment={comment}
                author={this.props.commentAuthors[comment.author_id]}
                updateComment={this.props.updateComment}
                deleteComment={this.props.deleteComment}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  const articleId = ownProps.articleId;
  return {
    article: state.ents.articles[articleId],
    articleId: articleId,
    comments: selectArticleComments(state, articleId),
    commentAuthors: selectArticleCommentAuthors(state, articleId),
    currentUser: state.session.currentUser
  };
};

const mdp = (dispatch) => {
  return {
    fetchArticleComments: (id) => dispatch(fetchArticleComments(id)),
    createComment: (comment) => dispatch(createComment(comment)),
    updateComment: (comment) => dispatch(updateComment(comment)),
    deleteComment: (comment) => dispatch(deleteComment(comment)),
  };
};

export default connect(msp, mdp)(CommentsSection);
