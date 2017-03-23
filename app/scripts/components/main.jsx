var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

var Header = require('./layouts/header.jsx').Header
var ParseFile = require('../models/parsefile').ParseFile;
// var FishPicCollection = require('../models/fishpic').FishPicCollection;
// var FishPic = require('../models/fishpic').FishPic;
var User = require('../models/user').User;
var BragPicCollection = require('../models/bragpics').BragPicCollection;
var BragPic = require('../models/bragpics').BragPic;
var Footer = require('./layouts/footer.jsx').Footer;
var UserRecords = require('./userrecords.jsx').UserRecords;

class BragBoard extends React.Component {
  constructor(props){
    super(props);

    var self = this;
    var bragPicCollection = new BragPicCollection();

    bragPicCollection.fetch().then(function(){
      self.setState({collection: bragPicCollection});
    });


    this.state = {
      pic: null,
      collection: bragPicCollection
    }
    console.log('here idiot', this.state.collection);
  }




    render() {
      var user = User.current();

      var images = this.state.collection.map(function(image){
        return (
          <div key={image.cid} className="wrapper">

          <div className="col-sm-6 col-md-4">
          <div className="well">
            <a href={image.attributes.image}><img src={image.attributes.image} alt="..." /></a>
            <div className="caption">
              <p>Nice Fish!!</p>
              <p><a href="#" className="btn btn-primary" role="button">Comment</a></p>

            </div>
          </div>
          </div>
          </div>
        )

      })
        return (
    <div>
      <img className="lake4" src="./images/lake4.jpg" alt="" />
      <div className="container">
        <div className="row">
        <div className="col-md-12">
            <Header></Header>
            {images}
        </div>
        </div>
        <div className="container">








    </div>
</div>
<Footer />
    </div>




    )
  }
};
module.exports = {
  BragBoard
};

// <div className="row">
//   <form encType="multipart/form-data">
//     <input type="file" accept=".jpeg, .jpg, .gif, .PNG" onChange={this.handleImageChange} /><br />
//     <img src={this.state.preview} height="250" width="200" alt="Your Brag Picture Goes Here" />
//   </form>
//     <span className="upload"><button className="signup-btn btn btn-primary" onClick={this.handleUpload}><img src="./images/button-logo1.png"/>Upload Photo</button></span>
// </div>
