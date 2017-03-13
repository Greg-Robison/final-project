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

var url = "http://api.wunderground.com/api/7f941aa7f5bbf3a0/conditions/q/SC/Greenville.json";

$.get({
  url: url,
  dataType: "jsonp"
}, function(data) {
  console.log(data);
})
