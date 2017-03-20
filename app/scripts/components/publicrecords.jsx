// var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');
var Header = require('./layouts/header.jsx').Header;
var User = require('../models/user').User;
var Maps = require('./layouts/maps.jsx').Maps;
var Places = require('./layouts/places.jsx').Places;


class PublicRecords extends React.Component {
  render(){
    var user = User.current();

    console.log(PublicRecords);
    return(
        <div className="container-fluid">

          <div className="row">
            <div className="col-md-12">
              <Header></Header>
              <App></App>
              <h1>This is where the Public records will go</h1>
            </div>
          </div>

        </div>
    )
  }
};
class App extends React.Component{
  render(){
    return(
      <div>
        <Maps></Maps>
        <Places></Places>
      </div>
    )
  }
};
module.exports = {
  PublicRecords,
  App
};
