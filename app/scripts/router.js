var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var parse = require('./setup');
var LoginContainer = require('./components/login.jsx').LoginContainer;
var BragBoard = require('./components/main.jsx').BragBoard;

var AppRouter = Backbone.Router.extend({
  routes:{
    "": 'index',
    'login/': 'login',
    'braggingrites/': 'braggingrites'
  },
  initialize: function(){
    parse.setup({
      BASE_API_URL: 'https://tiny-parse-server.herokuapp.com'
    });
  },
  braggingrites: function(){
    ReactDOM.render(
      React.createElement(BragBoard),
      document.getElementById('app')
    )
  },
  index: function(){
    ReactDOM.render(
      React.createElement(LoginContainer),
      document.getElementById('app')
    );
  },
});
var appRouter = new AppRouter();

module.exports = appRouter;
