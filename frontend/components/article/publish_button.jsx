import React from 'react';
import { connect } from 'react-redux';
import { merge } from 'lodash';

import {
  toggleArticlePublished,
  receivePublishDate
} from '../../actions/article_actions';

class PublishButton extends React.Component {
  constructor(props){
    super(props);
  }

  setPublishText(published){
    if (published) {
      return "Revert to draft";
    } else {
      return "Publish";
    }
  }

  publishArticle(){
    this.props.toggleArticlePublished(this.props.article.id);
  }

  render(){
    return (
      <div className="publish_menu_container">
        <button onClick={this.publishArticle.bind(this)}>
          {this.setPublishText(this.props.article.published)}
        </button>
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  return {
    article: state.ents.articles[ownProps.match.params.id] || {},
  };
};

const mdp = (dispatch) => {
  return {
    toggleArticlePublished: (id) => dispatch(toggleArticlePublished(id))
  };
};

export default connect(msp, mdp)(PublishButton);
