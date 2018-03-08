import React from 'react';
import { connect } from 'react-redux';

import {
  selectArticleChunks,
  selectArticleChunksforEdit
} from '../../reducers/selectors.js';
import { fetchArticle } from '../../actions/article_actions';
import { receiveChunk } from '../../actions/chunk_actions';

import UserHeader from '../user_header';
import ArticleTitleEditor from './article_title_editor';
import ArticleEditBody from './article_edit_body';

class ArticleEdit extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchArticle(this.props.articleId);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.articleId !== nextProps.articleId){
      this.props.fetchArticle(nextProps.articleId);
    }
  }

  render(){
    if (this.props.article.chunks.length === 0 || !this.props.author.length === 0) {
      return <div></div>;
    }
    return (
      <div className="article_show">
        I'm here!
        <div className="article_title"></div>
        <ArticleEditBody
          chunks={this.props.chunks}
          article={this.props.article}
          author={this.props.author}
          receiveChunk={this.props.receiveChunk}
          />
      </div>
    );
  }

}

const msp = (state, ownProps) => {
  const articleId = ownProps.match.params.articleId;
  const article = state.ents.articles[articleId] || {chunks: []};
  const author = state.ents.users[article.author_id] || {};
  return {
    articleId: articleId,
    article: article,
    chunks: selectArticleChunksforEdit(state, article),
    author: author,
  };
};

const mdp = (dispatch) => {
  return {
    fetchArticle: (id) => dispatch(fetchArticle(id)),
    receiveChunk: (chunk) => dispatch(receiveChunk(chunk))
  };
};

export default connect(msp, mdp)(ArticleEdit);


// NOTE: Hidding RETURN should generate a new empty chunk below current
// chunk (not splitting content).  Pressing BACKSPACE in an empty chunk should delete the chunk
// and return the cursor to the end of the previous chunk.
