import React from 'react';
import { connect } from 'react-redux';

import { selectArticleChunks } from '../../reducers/selectors.js';
import { fetchArticle } from '../../actions/article_actions';

import ArticleHeader from './article_header';
import ArticleBody  from './article_body';
import ArticleFooter from './article_footer';

class ArticleShow extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchArticle(this.props.articleId);
  }

  render(){
    return(
      <div>
        <p>Articleshow!</p>
        <ArticleHeader article={this.props.article} author={this.props.author}/>
        <ArticleBody chunks={this.props.chunks}/>
        <ArticleFooter article={this.props.article} author={this.props.author}/>
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  const articleId = ownProps.match.params.articleId;
  const article = state.ents.articles[articleId];
  return {
    articleId: articleId,
    article: article,
    chunks: selectArticleChunks(state, article),
  };
};

const mdp = (dispatch) => {
  return {
    fetchArticle: (id) => dispatch(fetchArticle(id)),
  };
};

export default connect(msp, mdp)(ArticleShow);
