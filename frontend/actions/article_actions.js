import * as ArticlesAPIUtil from '../util/articles_api_util';

export const RECEIVE_ARTICLE = "RECEIVE_ARTICLE";
export const REMOVE_ARTICLE = "REMOVE_ARTICLE";
export const RECEIVE_HOMEPAGE_ARTICLES = "RECEIVE_HOMEPAGE_ARTICLES";
export const RECEIVE_ARTICLE_ERRORS = "RECEIVE_ARTICLE_ERRORS";
export const RECEIVE_TITLE = "RECEIVE_TITLE";
export const TOGGLE_ARTICLE_PUBLISHED = "TOGGLE_ARTICLE_PUBLISHED";

export const receiveArticle = ({ article, chunks, user }) => {
  return {
    type: RECEIVE_ARTICLE,
    article,
    chunks,
    user
  };
};

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_ARTICLE_ERRORS,
    errors
  };
};

export const removeArticle = (id) => {
  return {
    type: REMOVE_ARTICLE,
    id
  };
};

export const receiveTitle = (title) => {
  return {
    type: RECEIVE_TITLE,
    title
  };
};

export const receiveHomepageParticles = (articles) => {
  return {
    type: RECEIVE_HOMEPAGE_ARTICLES,
    articles
  };
};

export const toggleArticlePublished = (id) => {
  return {
    type: TOGGLE_ARTICLE_PUBLISHED,
    id
  };
};

export const fetchArticle = (id) => {
  return (dispatch) => {
    return ArticlesAPIUtil.fetchArticle(id).then(
      (payload) => { dispatch(receiveArticle(payload)); }
    );
  };
};

export const updateArticle = (article) => {
  return (dispatch) => {
    return ArticlesAPIUtil.updateArticle(article).then(
      (payload) => { return dispatch(receiveArticle(payload)); },
      (errors) => { return dispatch(receiveErrors(errors.responseJSON)); }
    );
  };
};

export const createArticle = () => {
  return (dispatch) => {
    return ArticlesAPIUtil.createArticle().then(
      (payload) => {
        return dispatch(receiveArticle(payload));
      }
    );
  };
};

export const deleteArticle = (id) => {
  return (dispatch) => {
    return ArticlesAPIUtil.deleteArticle(id).then((payload) => {
      return dispatch(removeArticle(id));
    });
  };
};

export const fetchHomepageArticles = () => {
  return (dispatch) => {
    return ArticlesAPIUtil.fetchHomepageArticles().then(
      (payload) => dispatch(receiveHomepageParticles(payload))
    );
  };
};
