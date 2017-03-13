var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

class BragBoard extends React.Component {

    render() {
        return (


    <div className="container">
      <div className="row">
        <span><h2>Upload Your Fish Here</h2><input type="file" /></span>
              <div className="row">
                <div className="col-sm-6 col-md-4">
                  <div className="thumbnail">
                    <a href="./images/mybass.jpg"><img src="./images/mybass.jpg" alt="..." /></a>
                    <div className="caption">
                      <p>Thumbnail label</p>
                      <p>Nice Fish!!</p>
                      <p><a href="#" className="btn btn-primary" role="button">Comment</a> <a href="#" className="btn btn-default" role="button">Delete</a></p>
                    </div>
                  </div>
                </div>
              </div>
              <span><a href="#publicrecords/"><button className="signin btn btn-primary">Public Records</button></a></span>
      </div>
    </div>




    )
  }
};
module.exports = {
  BragBoard
};
