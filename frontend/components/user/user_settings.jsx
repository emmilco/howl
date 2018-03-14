import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import ImageUploadMenu from '../image_upload_menu';

import { updateUser } from '../../actions/user_actions';

class UserSettings extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      full_name: "",
      bio: "",
      email: "",
      password: ""
    };
  }

  componentDidMount(){
    this.setState(this.props.currentUser);
  }

  handleSubmit(e) {
    e.preventDefault();
    const updates = this.state;
    if (updates.password === "") { delete updates.password; }
    this.props.updateUser(this.state).then(() => {
      this.props.history.push(`/users/${this.props.currentUser.id}`);
    });
  }


  handleCancel(e){
    e.preventDefault();
    this.setState({password: ""});
  }

  updateField(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }


  render(){
    const user = this.props.currentUser;
    if (!user){ return <Redirect to="/" />; }
    return (
      <div className="user_settings">
        <div className="user_settings_info">
          <div className="full_name">Full Name
            <input type="text"
              onChange={this.updateField("full_name")}
              value={this.state.full_name}></input>
          </div>
          <div className="bio">Biography
            <textarea
              onChange={this.updateField("bio")}
              value={this.state.bio}></textarea>
          </div>
          <div className="email">Email Address
            <input type="text"
              onChange={this.updateField("email")}
              value={this.state.email}></input>
          </div>
          <div className="new_password">New Password
            <input type="password"
              onChange={this.updateField("password")}
              value={this.state.password}></input>
          </div>
          <div className="submit_buttons">
            <button onClick={this.handleSubmit}>Update</button>
            <button onClick={this.handleCancel}>Cancel</button>
          </div>
        </div>
        <div className="avatar">
          <img src={user.avatar_url}></img>
          <ImageUploadMenu chunk={user} upload_type="avatar"/>
        </div>
      </div>
    );
  }
}

const msp = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mdp = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user))
  };
};

export default withRouter(connect(msp,mdp)(UserSettings));
