var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');


class Marketing extends React.Component {
  render(){
    return(
      <div className="container">


    <div className="container-fluid">
      <div className="row fixed-bottom">
        <a className="logo-bottom" href="#">
          <img className="logo-bottom" alt="Brand" src="images/logo1.png" />
        </a>
        <span className="signin"><a href="#login/"><button className="signin btn btn-primary">Sign In</button></a></span>
        <span className="signup"><a href="#signup/"><button className="signup btn btn-primary">Sign Up</button></a></span>
      </div>
    </div>
    

      </div>
     )
  }
};

module.exports = {
  Marketing
};
