// var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');


class PublicRecords extends React.Component {
  render(){
    console.log(PublicRecords);
    return(
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>This is where the Public records will go</h1>
            </div>
          </div>

        </div>
    )
  }
};
module.exports = {
  PublicRecords
};
