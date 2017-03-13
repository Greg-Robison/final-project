var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

class BragBoard extends React.Component {
    handleConversion(e) {
        e.preventDefault();
        console.log('button clicked');
    }
    render() {
        return (

              <div className="row">
  <div className="col-sm-6 col-md-4">
    <div className="thumbnail">
      <a href="./images/mybass.jpg"><img src="./images/mybass.jpg" alt="..." /></a>
      <div className="caption">
        <p>Thumbnail label</p>
        <p>Nice Fish!!</p>
        <p><a href="#" className="btn btn-primary" role="button">Comment</a> <a href="#" className="btn btn-default" role="button">Delete</a></p>
        <input type="file"/>
      </div>
    </div>
  </div>
</div>



    )
  }
};
module.exports = {
  BragBoard
};
