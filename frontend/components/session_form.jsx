import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {full_name: "", email: "", password: ""};
    this.updateField = this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitForm(this.state);
  }

  updateField(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }


  render() {
    return (
      <div className="modal_form">
        <h2>{this.props.header}</h2>
        <p>{this.props.blurb}</p>

        <form onSubmit={this.handleSubmit}>

          {this.props.formType === "signup" &&
            <label><div>Full name:</div>
              <input id="full_name" type="text"
                onChange={this.updateField("full_name")}
                value={this.state.full_name}>
              </input>
            </label>}


          <label><div>Email address:</div>
            <input id="email" type="text"
              onChange={this.updateField("email")}
              value={this.state.email}>
            </input>
          </label>

          <label><div>Password:</div>
            <input id="password" type="password"
              onChange={this.updateField("password")}
              value={this.state.password}>
            </input>
          </label>

          <button>{this.props.buttonText}</button>
        </form>
      </div>
    );
  }
}

export default SessionForm;
