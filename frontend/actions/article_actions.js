import * as ArticlesAPIUtil from '../util/articles_api_util';

export const RECEIVE_ARTICLE = "RECEIVE_ARTICLE";
export const REMOVE_ARTICLE = "REMOVE_ARTICLE";
export const RECEIVE_HOMEPAGE_ARTICLES = "RECEIVE_HOMEPAGE_ARTICLES";
export const RECEIVE_ARTICLE_ERRORS = "RECEIVE_ARTICLE_ERRORS";
export const RECEIVE_TITLE = "RECEIVE_TITLE";
export const TOGGLE_ARTICLE_PUBLISHED = "TOGGLE_ARTICLE_PUBLISHED";
export const RECEIVE_ARTICLE_LIKE = "RECEIVE_ARTICLE_LIKE";
export const REMOVE_ARTICLE_LIKE = "REMOVE_ARTICLE_LIKE";
export const RECEIVE_ARTICLES_FOR_MANAGER = "RECEIVE_ARTICLES_FOR_MANAGER";

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

export const receiveArticleLike = (id) => {
  return {
    type: RECEIVE_ARTICLE_LIKE,
    id
  };
};

export const removeArticleLike = (id) => {
  return {
    type: REMOVE_ARTICLE_LIKE,
    id
  };
};

export const receiveArticlesForManager = (payload) => {
  return {
    type: RECEIVE_ARTICLES_FOR_MANAGER,
    articles: payload.articles,
    manager_articles_index: payload.manager_articles_index
  };
};


export const receiveHomepageParticles = (payload) => {
  return {
    type: RECEIVE_HOMEPAGE_ARTICLES,
    articles: payload.articles,
    users: payload.users,
    homepage_articles_index: payload.homepage_articles_index,
    homepage_authors_index: payload.homepage_authors_index
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
      (errors) => {return dispatch(receiveErrors(errors.responseJSON)); }
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

export const likeArticle = (articleId) => {
  return (dispatch) => {
    return ArticlesAPIUtil.likeArticle(articleId).then(() => {
      return dispatch(receiveArticleLike(articleId));
    });
  };
};

export const unlikeArticle = (articleId) => {
  return (dispatch) => {
    return ArticlesAPIUtil.unlikeArticle(articleId).then(() => {
      return dispatch(removeArticleLike(articleId));
    });
  };
};

export const fetchArticlesForManager = () => {
  return (dispatch) => {
    return ArticlesAPIUtil.fetchArticlesForManager().then((payload) => {
      return dispatch(receiveArticlesForManager(payload));
    });
  };
};
