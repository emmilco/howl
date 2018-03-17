import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createArticle } from '../../actions/article_actions';
import { clearNewArticle } from '../../actions/ui_actions';

class ArticleNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {newArticlePath: null};
  }

  setNewArticlePath(id){
    this.setState({newArticlePath: `/articles/${id}/edit`});
  }

  componentDidMount(){
    this.props.createArticle().then(
      ({ article }) => {
        this.props.history.replace(`/articles/${article.id}/edit`);
      }
    );
  }

  render() {
    return null;
  }
}

const msp = (state) => {
  return {
    currentUser: state.session.currentUser,
    newArticle: state.ui.newArticle
  };
};

const mdp = (dispatch) => {
  return {
    createArticle: () => dispatch(createArticle()),
    clearNewArticle: () => dispatch(clearNewArticle())
  };
};

export default withRouter(connect(msp, mdp)(ArticleNew));
