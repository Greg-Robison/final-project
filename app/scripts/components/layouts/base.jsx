var React = require('react');

function BaseLayout(props){
return (
  <div className="container">
    <div className="row">
      <div className="col-md-12">

        {props.isUserLoggedIn ? <Header /> : <AnonHeader />}

        {props.children}

      </div>
    </div>
  </div>
);
}
function Header(props){
  return(
    <h1 className="welcome text-center">Welcome to Greg's Fishing App</h1>
  );
}
function AnonHeader(props){
  return(
    <h1>Please Signin To Use Greg's Fishing App</h1>
  );
}
module.exports = {
  BaseLayout
};
