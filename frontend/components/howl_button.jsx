import React from 'react';
import { connect } from 'react-redux';

import { likeArticle, unlikeArticle } from '../actions/article_actions';
import { likeComment, unlikeComment } from '../actions/comment_actions';

class HowlButton extends React.Component {
  constructor(props){
    super(props);
    this.likeHandler = this.likeHandler.bind(this);
    this.likeStatus = this.likeStatus.bind(this);
  }

  likeHandler() {
    if (this.props.likeable_type === "article"){
      if (this.props.likeable.liked) {
        this.props.unlikeArticle(this.props.likeable.id);
      } else {
        this.props.likeArticle(this.props.likeable.id);
      }
    } else {
      if (this.props.likeable.liked) {
        this.props.unlikeComment(this.props.likeable.id);
      } else {
        this.props.likeComment(this.props.likeable.id);
      }
    }
  }

  likeStatus(){
    if (this.props.likeable.liked) {
      return "liked";
    } else {
      return "unliked";
    }  }

  render(){
    if (!this.props.currentUser ||
        this.props.likeable.id === this.props.currentUser.id) {
      return <div></div>;
    }
    return (
      <div onClick={this.likeHandler}
        className="howl_button">
        <div className={this.likeStatus()}>
          {this.props.likeable.like_count}
        </div>
      </div>
    );
  }
}

const msp = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mdp = (dispatch) => {
  return {
    likeArticle: (likeableId) => dispatch(likeArticle(likeableId)),
    unlikeArticle: (likeableId) => dispatch(unlikeArticle(likeableId)),
    likeComment: (likeableId) => dispatch(likeComment(likeableId)),
    unlikeComment: (likeableId) => dispatch(unlikeComment(likeableId))
  };
};

export default connect(msp,mdp)(HowlButton);
