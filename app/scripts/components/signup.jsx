var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

var LoginLayout = require('./layouts/login.jsx').LoginLayout;

var User = require('../models/user.js').User;

class SignupContainer extends React.Component{
  constructor(props){
    super(props);
  }

  createAccount(creds){
    var user = new User(creds);
    user.save().then(function(data){
      localStorage.setItem('user', JSON.stringify(data));
      Backbone.history.navigate('braggingrites/', {trigger: true});
    })
  }

  render(){
    console.log('here');
    return(
    <LoginLayout isUserLoggedIn={true}>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
              <h1 className="welcome">Sign Up</h1>
              <SignupForm action={this.createAccount} submitBtn="Create Account"/>
          </div>
        </div>
      </div>
    </LoginLayout>
  )
}
}

class SignupForm extends React.Component {
  constructor(props){
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    };
  }
  handleEmailChange(e){
    this.setState({username: e.target.value});
    }
  handlePasswordChange(e){
    this.setState({password: e.target.value});
    }
  handleSubmit(e){
    e.preventDefault();
    this.props.action(this.state);
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email-login">Email Address</label>
          <input onChange={this.handleEmailChange} className="form-control" name="email" id="email-login" placeholder="E-mail"/>
        </div>
        <div className="form-group">
          <input onChange={this.handlePasswordChange} className="form-control" name="password" id="password-login" type="password" placeholder="Password Please" />
        </div>
        <input className="btn btn-primary" type="submit" value={this.props.submitBtn} />

    </form>
    )
  }
}

module.exports = {
  SignupContainer
};
