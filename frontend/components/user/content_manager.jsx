import React from 'react';
import { connect } from 'react-redux';

import { selectArticlesForManager } from '../../reducers/selectors';
import {
  fetchArticlesForManager,
  deleteArticle
} from '../../actions/article_actions';

import UserShowHeader from './user_show_header';
import ContentManagerFeedItem from './content_manager_feed_item';

class ContentManager extends React.Component {

  componentDidMount(){
    this.props.fetchArticlesForManager();
  }

  render(){
    return (
      <div>
        <UserShowHeader
          date={this.props.user.created_at}
          bio={this.props.user.bio}
          user={this.props.user}/>
        <div className="content_manager_feed">
          {this.props.articles.map((article) =>{
            return <ContentManagerFeedItem
              deleteArticle={this.props.deleteArticle}
              article={article} />;
          })}
        </div>

      </div>
    );
  }
}

const msp = (state) => {
  return {
    articles: selectArticlesForManager(state),
    user: state.session.currentUser
  };
};

const mdp = (dispatch) => {
  return {
    fetchArticlesForManager: () => dispatch(fetchArticlesForManager()),
    deleteArticle: (id) => dispatch(deleteArticle(id))
  };
};

export default connect(msp, mdp)(ContentManager);
