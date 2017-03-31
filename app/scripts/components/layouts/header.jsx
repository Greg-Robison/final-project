var React = require('react');
var Backbone = require('backbone');

var User = require('../../models/user.js').User;


class Header extends React.Component {
  constructor(props){
    super(props);

    this.logOut = this.logOut.bind(this);
  }
  logOut(e) {
    e.preventDefault();
    // ajax call to parse logout endpoint
    User.logout();

    // clear localStorage
    localStorage.clear();

    // navigate to login route
    Backbone.history.navigate('login/', {trigger: true});

}
  render(){
    var user = User.current();
    return(

      <div className="container-fluid">
<div className="col-md-12">
    <div className="well well-header">

      <a href="#"><img className="logo" alt="Brand" src="images/logo3.png" /></a>
      <img className="links gif" src="./images/giphy.gif" alt="" />


      <div className="dropdown links">

        <a className="dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          <h3 className="name">Welcome {user.get('name')}</h3>

        </a>
        <ul className="dropdown-menu links" aria-labelledby="dropdownMenu1">
          <li><a className="links" href="#braggingrites/"> Bragging Rites</a></li>
        <li><a className="links" href="#userrecords/">{user.get('name') + "'s"} Records</a></li>
          <li><a className="links" href="" onClick={this.logOut}> Sign Off</a></li>

      </ul>
      </div>
  </div>
</div>
</div>

    )
  }
};

module.exports = {
  Header
};
