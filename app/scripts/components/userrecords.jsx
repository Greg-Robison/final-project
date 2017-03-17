var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

var ParseFile = require('../models/parsefile').ParseFile;
var FishPicCollection = require('../models/fishpic').FishPicCollection;
var FishPic = require('../models/fishpic').FishPic;
var User = require('../models/user').User;




class UserRecords extends React.Component {
  constructor(props){
    super(props);

    var self = this;
    var fishPicCollection = new FishPicCollection();

    fishPicCollection.fetch().then(function(){
      self.setState({collection: fishPicCollection});
    });

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.logOut = this.logOut.bind(this);

    this.state = {
      preview: null,
      pic: null,
      collection: fishPicCollection
    };



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

  handleImageChange(e){
    var file = e.target.files[0];
    this.setState({pic: file});
    var reader = new FileReader();
    reader.onloadend = ()=>{
      this.setState({preview: reader.result});
    };

    reader.readAsDataURL(file);
  }

  handleUpload(e){
    e.preventDefault();
    var pic = this.state.pic;
    var image = new ParseFile(pic);
    image.save({}, {
      data: pic
    }).then((response)=>{
      var imageUrl = response.url;
      console.log('imageUrl', imageUrl);
      var fishPic = new FishPic();
      fishPic.set({
        name: this.state.name,
        description: "",
        image: imageUrl
      });
      // console.log('fishPic', fishPic);
      fishPic.save();
      this.forceUpDate();
    });
  }

  render(){
    var user = User.current();
    var images = this.state.collection.map(function(image){
      return (
        <div className="wrapper" key={image.cid}>

        <div className="col-sm-6 col-md-4">
        <div className="thumbnail" key={image.cid}>
          <a href={image.get('image')}><img src={image.get('image')} alt="..." /></a>
          <div className="caption">
            <p>Thumbnail label</p>
            <p>Nice Fish!!</p>
            <p><a href="#" className="btn btn-primary" role="button">Comment</a> <a href="#" className="btn btn-default" role="button">Delete</a></p>

          </div>
        </div>
        </div>
        </div>
      )

    })
    return(
      <div className="wrapper">
        <img className="lake5" src="./images/lake7.jpg" alt="" />
          <div className="col-md-12">
              <div className="well">
                  <a href="#"><img className="logo" alt="Brand" src="images/logo1.png" /></a>
                  <span className="links"><h4>{user.get('name')}</h4><a href="" onClick={this.logOut}> Sign Off</a></span>
                  <span className="links"><a href="#userrecords/"> User Records</a></span>
                  <span className="links"><a href="#publicrecords/"> Public Records</a></span>
                  <span className="links"><a href="#braggingrites/"> Recent Catches</a></span>
              </div>
          </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>This is where the User records will go</h1>
                <div className="row">
                  <form encType="multipart/form-data">
                    <input type="file" accept=".jpeg, .jpg, .gif, .PNG" onChange={this.handleImageChange} /><br />
                    <img src={this.state.preview} height="250" width="200" alt="Your Brag Picture Goes Here" />
                  </form>
                    <span className="upload"><button className="signup-btn btn btn-primary" onClick={this.handleUpload}><img src="./images/button-logo1.png"/>Upload Photo</button></span>
                </div>
                <div className="row">
                  {images}
                </div>

            </div>
          </div>

        </div>
      </div>
    )
  }
};
module.exports = {
  UserRecords
};
