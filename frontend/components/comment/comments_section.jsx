import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
      <div className="comments_section">
        Hello from the comments section!
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  const articleId = ownProps.articleId;
  return {
    articleId: articleId,
    comments: selectArticleComments(state, articleId),
    commentAuthors: selectArticleCommentAuthors(state, articleId)
  };
};

const mdp = (dispatch) => {
  return {
    fetchArticleComments: (id) => dispatch(fetchArticleComments(id)),
    createComment: (comment) => dispatch(createComment(comment)),
    updateComment: (comment) => dispatch(updateComment(comment)),
    deleteComment: (id) => dispatch(deleteComment(id)),
  };
};

export default connect(msp, mdp)(CommentsSection);
