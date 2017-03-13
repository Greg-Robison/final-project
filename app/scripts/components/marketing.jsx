var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');


class Marketing extends React.Component {
  render(){
    return(
      <div className="container">
      <h1>Well Hello There</h1>
        <nav className="navbar navbar-default navbar-fixed-bottom">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">
          <img className="logo" alt="Brand" src="images/logo.png" />
        </a>
        <span><a href="#login/"><button className="signin btn btn-primary">Sign In</button></a></span>
        <span><a href="#signup/"><button className="signup btn btn-primary">Sign Up</button></a></span>
      </div>
    </div>
  </nav>

      </div>
     )
  }
};

module.exports = {
  Marketing
};
