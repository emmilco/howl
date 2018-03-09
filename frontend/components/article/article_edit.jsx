import React from 'react';
import { connect } from 'react-redux';
import { merge } from 'lodash';

import {
  selectArticleChunks,
  selectArticleChunksforEdit
} from '../../reducers/selectors.js';
import {
  fetchArticle,
  updateArticle,
  receiveTitle
} from '../../actions/article_actions';
import {
  receiveChunk,
  deleteChunk,
  createChunk
} from '../../actions/chunk_actions';

import UserHeader from '../user_header';
import ArticleTitleEditor from './article_title_editor';
import ArticleEditBody from './article_edit_body';

class ArticleEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {saveTimer: null};
  }

  componentDidMount(){
    this.props.fetchArticle(this.props.articleId);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.articleId !== nextProps.articleId){
      this.props.fetchArticle(nextProps.articleId);
    }
  }

  saveHandler(){
    clearTimeout(this.state.saveTimer);
    this.setState({
      saveTimer: window.setTimeout(() => {
        this.props.updateArticle(this.packagedArticle());
        console.log("articlesaved");
      }, 5000)
    });
  }

  packagedArticle() {
    const packagedArticle = merge({}, this.props.article);
    packagedArticle.chunks_attributes = [];
    this.props.article.chunks.forEach((chunkId) => {
      packagedArticle.chunks_attributes.push(this.props.chunks[chunkId]);
    });
    delete packagedArticle.chunks;
    return packagedArticle;
  }

  render(){
    return (
      <div className="article_show article_edit" onInput={this.saveHandler.bind(this)}>
        {Boolean(this.props.article.title === undefined) || <ArticleTitleEditor
          receiveTitle={this.props.receiveTitle}
          title={this.props.article.title}
          id={this.props.article.id}
          />}
        {Boolean(this.props.chunks.length === 0) || <ArticleEditBody
          chunks={this.props.chunks}
          article={this.props.article}
          author={this.props.author}
          receiveChunk={this.props.receiveChunk}
          deleteChunk={this.props.deleteChunk}
          createChunk={this.props.createChunk}
          />}
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
    receiveChunk: (chunk) => dispatch(receiveChunk(chunk)),
    deleteChunk: (chunk) => dispatch(deleteChunk(chunk)),
    createChunk: (chunk, ord) => dispatch(createChunk(chunk, ord)),
    updateArticle: (packagedArticle) => dispatch(updateArticle(packagedArticle)),
    receiveTitle: (title) => dispatch(receiveTitle(title))
  };
};

export default connect(msp, mdp)(ArticleEdit);
