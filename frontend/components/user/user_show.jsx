import React from 'react';
import { connect } from 'react-redux';

import UserHeader from '../user_header';
import UserArticleFeedItem from './user_article_feed_item';

import { selectUserArticles } from '../../reducers/selectors';
import { fetchUser } from '../../actions/user_actions';

class UserShow extends React.Component {

  componentDidMount(){
    this.props.fetchUser(this.props.userId);
  }

  render(){
    if(!this.props.user) { return <div></div>; }
    return <div className="user_show">
      <UserHeader
        date={this.props.user.created_at}
        bio={this.props.user.bio}
        user={this.props.user}/>
      <div className="user_articles_feed">
        {this.props.articles.map((article) =>{
          return <UserArticleFeedItem 
            user={this.props.user}
            article={article} />;
        })}
      </div>
    </div>;
  }

}

const msp = (state, ownProps) => {
  const userId = ownProps.match.params.userId;
  return {
    userId: userId,
    user: state.ents.users[userId],
    articles: selectUserArticles(state, userId)
  };
};

const mdp = (dispatch) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId))
  };
};


export default connect(msp, mdp)(UserShow);
