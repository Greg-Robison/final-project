var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

var LoginLayout = require('./layouts/login.jsx').LoginLayout;

var User = require('../models/user.js').User;

class LoginContainer extends React.Component{
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
  }
  login(creds){
    User.login(creds, function(){
      Backbone.history.navigate('', {trigger: true});
    })
  }
  // createAccount(creds){
  //   var user = new User(creds);
  //   user.save().then(function(data){
  //     localStorage.setItem('user', JSON.stringify(data));
  //     Backbone.history.navigate('braggingrites/', {trigger: true});
  //   })
  // }


  render(){
    console.log('here');
    return(
      <div className="wrapper">
        <img className="lake3" src="./images/lake3.jpg" alt="" />

    <LoginLayout isUserLoggedIn={true}>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
              <h1 className="welcome">Allready a member Log In</h1>
              <LoginForm action={this.login} submitBtn="Login" />
          </div>

        </div>
      </div>

    </LoginLayout>
    </div>
  )
}
}

class LoginForm extends React.Component {
  constructor(props){
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      name: ''
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
        <span className="signup"><a href="#signup/"><button className="signup-btn btn btn-primary" value={this.props.submitBtn}><img src="./images/button-logo1.png"/>Log In</button></a></span>


    </form>
    )
  }
}

// class SignUpForm extends LoginForm {
//
// }

module.exports = {
  LoginContainer
};
