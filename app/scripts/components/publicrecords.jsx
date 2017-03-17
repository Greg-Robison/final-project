// var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');
var Header = require('./layouts/header.jsx').Header
var User = require('../models/user').User;



class PublicRecords extends React.Component {
  render(){
    var user = User.current();

    console.log(PublicRecords);
    return(
        <div className="container-fluid">
          <Header>
          <div className="row">
            <div className="col-md-12">
              <h1>This is where the Public records will go</h1>
            </div>
          </div>
          </Header>
        </div>
    )
  }
};
module.exports = {
  PublicRecords
};
