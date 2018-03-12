import React from 'react';
import { connect } from 'react-redux';

import { selectUserArticles } from '../../reducers/selectors';
import { fetchUser } from '../../actions/user_actions';

class UserShow extends React.Component {

  componentDidMount(){
    this.props.fetchUser(this.props.userId);
  }

  render(){
    return <div className="user_show">
      <UserHeader
        date={this.props.user.created_at}
        bio={this.props.user.bio}
        user={this.props.user}/>
      <div className="user_articles_feed">
        {this.props.articles.map((article) =>{
          return <UserArticleFeedItem article={article} />;
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
    articles: selectUserArticles(userId)
  };
};

const mdp = (dispatch) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId))
  };
};


export default connect(msp, mdp)(UserShow);
