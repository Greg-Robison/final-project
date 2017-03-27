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

        <a href="#"><img className="logo" alt="Brand" src="images/logo1.png" /></a>
        <img className="links gif" src="./images/giphy.gif" alt="" />
        <span className="links"><a href="" onClick={this.logOut}> Sign Off</a></span>
        <span className="links"><a href="#userrecords/">{user.get('name') + "'s"} Records</a></span>
        <span className="links"><a href="#braggingrites/"> Bragging Rites</a></span>

  </div>
</div>
</div>
    )
  }
};

module.exports = {
  Header
};
