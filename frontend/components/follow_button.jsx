import React from 'react';

class FollowButton extends React.Component {
  constructor(props){
    super(props);
    this.followHandler = this.followHandler.bind(this);
  }

  followHandler(e) {

  }

  render(){
    return (
      <button
        className={this.followStatus}
        onClick={this.followHandler}>
        {this.followText}
      </button>
    );
  }
}
