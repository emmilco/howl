import React from 'react';
import { connect } from 'react-redux';

import { fetchHomepageArticles } from '../actions/article_actions';
import {
  selectHomepageArticles,
  selectHomepageAuthors
} from '../reducers/selectors';

import HomepageTopArticles from './homepage_top_articles';
import HomepageFeedItem from './homepage_feed_item';


class Homepage extends React.Component {

  componentDidMount(){
    this.props.fetchHomepageArticles();
  }

  topArticleAuthors(){
    return this.props.articles.slice(0,5).map((article) => {
      return this.props.users[article.author_id];
    });
  }

  render(){
    return (
      <div>
        <HomepageTopArticles
          users={this.topArticleAuthors()}
          articles={this.props.articles.slice(0,5)} />
        <div className="homepage_articles_feed">
          {this.props.articles.slice(5).map((article) =>{
            return <HomepageFeedItem
              user={this.props.users[article.author_id]}
              article={article} />;
          })}
        </div>
      </div>
    );
  }
}

const msp = (state) => {
  return {
    articles: selectHomepageArticles(state),
    users: selectHomepageAuthors(state)
  };
};

const mdp = (dispatch) => {
  return {
    fetchHomepageArticles: () => dispatch(fetchHomepageArticles())
  };
};

export default connect(msp,mdp)(Homepage);
