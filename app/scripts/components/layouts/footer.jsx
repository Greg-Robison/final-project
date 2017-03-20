var React = require('react');

class Footer extends React.Component{
  render(){
    return(
    <div className="container">
      <hr></hr>
      <div className="row">
        <div className="col-md-4">
          <h3>Somthing goes here</h3>
          <h5>something Else Goes here</h5>
        </div>
        <div className="col-md-4">
          <h3>Somthing goes here</h3>
          <h5>something Else Goes here</h5>
        </div>
        <div className="col-md-4">
          <h3>Somthing goes here</h3>
          <h5>something Else Goes here</h5>
        </div>
      </div>
    </div>
    )
  }
};
module.exports = {
  Footer
};
