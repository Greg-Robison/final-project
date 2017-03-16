var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');



// CORS
$.ajaxSetup({
  beforeSend: function(xhr){
    xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
  }
});


require('./router');


$(function(){
  Backbone.history.start();
});
