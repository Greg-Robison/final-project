var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

var FishPicCollection = require('../models/fishpic').FishPicCollection;
var FishPic = require('../models/fishpic').FishPic;

class BragBoard extends React.Component {
  constructor(props){
    super(props);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.state = {
      preview: ''
    };
  }
  handleImageChange(e){
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = ()=>{
      this.setState({preview: reader.result});
    };
    reader.readAsDataURL(file)
  }



  // handleUpload(e){
  //   e.preventDefault();
  //   this.handleUpload = this.handleUpload.bind(this);
  //   var fishPicCollection = new FishPicCollection();
  //   var newFishPicCollection = this.state.fishPicCollection
  //   this.setState({fish})
  //   console.log('state', state);
  //
  // }


    render() {
        return (


    <div className="container">
      <div className="row">
        <input type="file" accept=".jpeg, .gif" onChange={this.handleImageChange} /><br />
          <img src={this.state.preview} height="300" width="200" alt="Your Brag Picture Goes Here" />
            <button className="logo-button" onClick={this.handleUpload}><img src="./images/logo2.png"/></button>
            <h2 className="click">Click Icon to Upload</h2>
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
