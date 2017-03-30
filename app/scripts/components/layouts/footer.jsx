var React = require('react');

class Footer extends React.Component{
  render(){
    return(
    <div className="container">
      <hr className="rule"></hr>
      <div className="row well footer">
        <div className="col-md-4">
          <h3>E-Mail us At:</h3>
          <a href="mailto:gjrobison64@gmail.com"><img className="logo" alt="Brand" src="images/logo1.png" /></a>
        </div>
        <div className="col-md-4">
          <h3>Commited to Preservation</h3>
          <h5>Hooked is dedicated to the preservation of the many species of fish in our lakes and ponds.
          Here at Hooked we practice catch and release, so anglers can enjoy fishing for years to come!</h5>
        </div>
        <div className="col-md-4">
          <h3>South Carolina Bass Fishing</h3>
          <h5>for more information on SC Bass fishing click <a href="http://www.scbassfed.org/" target="_blank">here.</a></h5>
        </div>
      </div>
    </div>
    )
  }
};
module.exports = {
  Footer
};
