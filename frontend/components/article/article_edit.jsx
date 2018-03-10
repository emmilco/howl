import React from 'react';
import { connect } from 'react-redux';
import { merge } from 'lodash';

import {
  selectArticleChunksforEdit
} from '../../reducers/selectors.js';
import {
  fetchArticle,
  updateArticle,
  receiveTitle
} from '../../actions/article_actions';

import UserHeader from '../user_header';
import ArticleTitleEditor from './article_title_editor';
import ArticleEditBody from './article_edit_body';

class ArticleEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {saveTimer: null, saved: "Saved"};
  }

  componentDidMount(){
    this.props.fetchArticle(this.props.articleId);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.articleId !== nextProps.articleId){
      this.props.fetchArticle(nextProps.articleId);
    }
  }

  componentDidUpdate(nextProps){
    if (this.props.article.published !== nextProps.article.published){
      this.promptSave();
    }
  }

  promptSave(){
    this.props.updateArticle(this.packagedArticle()).then(
      () => this.setState({saved: "Saved"})
    );
  }

  saveHandler(){
    clearTimeout(this.state.saveTimer);
    this.setState({saved: "Saving..."});
    this.setState({
      saveTimer: window.setTimeout(() => this.promptSave(), 3000)
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
    const status = (this.props.article.published ? "Published" : "Draft");
    return (
      <div className="article_show article_edit"
        onInput={this.saveHandler.bind(this)}>
        <div className="saved_status">
          {this.state.saved}
        </div>
        {Boolean(this.props.author === undefined) ||
          <UserHeader
            user={this.props.author}
            status={status}
          />}

        {Boolean(this.props.article.title === undefined) ||
          <ArticleTitleEditor
            receiveTitle={this.props.receiveTitle}
            title={this.props.article.title}
            id={this.props.article.id}
            />}

        {Boolean(this.props.chunks.length === 0) ||
          <ArticleEditBody
            chunks={this.props.chunks}
            article={this.props.article}
            author={this.props.author}
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
    author: author
  };
};

const mdp = (dispatch) => {
  return {
    fetchArticle: (id) => dispatch(fetchArticle(id)),
    updateArticle: (packagedArticle) => dispatch(updateArticle(packagedArticle)),
    receiveTitle: (title) => dispatch(receiveTitle(title))
  };
};

export default connect(msp, mdp)(ArticleEdit);
