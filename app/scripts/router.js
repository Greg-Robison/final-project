var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var parse = require('./setup');
var LoginContainer = require('./components/login.jsx').LoginContainer;
var SignupContainer = require('./components/signup.jsx').SignupContainer;
var BragBoard = require('./components/main.jsx').BragBoard;
var Marketing = require('./components/marketing.jsx').Marketing;
var PublicRecords = require('./components/publicrecords.jsx').PublicRecords;
var UserRecords = require('./components/userrecords.jsx').UserRecords;
var User = require('./models/user').User;
var AppRouter = Backbone.Router.extend({
  routes:{
    "": 'index',
    'login/': 'login',
    'signup/': 'signup',
    'braggingrites/': 'braggingrites',
    'publicrecords/': 'publicrecords',
    'userrecords/': 'userrecords'
  },
  initialize: function(){
    parse.setup({
      BASE_API_URL: 'https://robison.herokuapp.com'
    });
  },
execute: function(callback, args, name){
  var user = User.current();

  if(!user && name == 'login' || !user && name == 'signup') {

  } else if (!user && name != 'index'){
    this.navigate("", {trigger: true});
    return false;
  }
  return Backbone.Router.prototype.execute.apply(this, arguments);
},

  index: function(){
    ReactDOM.render(
      React.createElement(Marketing),
      document.getElementById('app')
    );
  },
  braggingrites: function(){
    ReactDOM.render(
      React.createElement(BragBoard),
      document.getElementById('app')
    )
  },
  publicrecords: function(){
    ReactDOM.render(
      React.createElement(PublicRecords),
      document.getElementById('app')
    )
  },
  userrecords: function(){
    ReactDOM.render(
      React.createElement(UserRecords),
      document.getElementById('app')
    )
  },
  login: function(){
    ReactDOM.render(
      React.createElement(LoginContainer),
      document.getElementById('app')
    );
  },
  signup: function(){
    ReactDOM.render(
      React.createElement(SignupContainer),
      document.getElementById('app')
    );
  }

});
var appRouter = new AppRouter();

module.exports = appRouter;
