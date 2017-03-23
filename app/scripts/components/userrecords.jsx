var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');
var EXIF = require('exif-js');
var moment = require('moment');

var ParseFile = require('../models/parsefile').ParseFile;
var Comments = require('../models/comment').Comments;
var CommentsCollection = require('../models/comment').CommentsCollection;

var FishPicCollection = require('../models/fishpic').FishPicCollection;
var FishPic = require('../models/fishpic').FishPic;
var Header = require('./layouts/header.jsx').Header
var User = require('../models/user').User;
var Google = require('../models/googlemaps').Google;
var Maps = require('./layouts/maps.jsx').Maps;
var Places = require('./layouts/places.jsx').Places;
var PublicRecords = require('./publicrecords.jsx').PublicRecords;
var Footer = require('./layouts/footer.jsx').Footer;
var BragPicCollection = require('../models/bragpics').BragPicCollection;
var BragPic = require('../models/bragpics').BragPic;






class UserRecords extends React.Component {
  constructor(props){
    super(props);
    var self = this;
    var userId = User.current().get('objectId');
    var fishPicCollection = new FishPicCollection();

    fishPicCollection.fetch().then(function(){
      self.setState({collection: fishPicCollection});
    });

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.addComment = this.addComment.bind(this);
    this.logOut = this.logOut.bind(this);

    this.state = {
      preview: null,
      pic: null,
      collection: fishPicCollection,
      lat: null,
      lon: null,
      latRef: null,
      lonRef: null
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

  handleImageChange(e) {
    var file = e.target.files[0];
    this.setState({pic: file});
    var reader = new FileReader();
    reader.onloadend = () => {
      var exif = EXIF.getData(file, () => {
      var lat = EXIF.getTag(file, "GPSLatitude");
      var lon = EXIF.getTag(file, "GPSLongitude");
      var date = EXIF.getTag(file, "DateTimeOriginal");
      //Convert coordinates to WGS84 decimal
      var latRef = EXIF.getTag(file, "GPSLatitudeRef") || "N";
      var lonRef = EXIF.getTag(file, "GPSLongitudeRef") || "W";
      lat = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);
      lon = (lon[0] + lon[1]/60 + lon[2]/3600) * (lonRef == "W" ? -1 : 1);
      //********************************
      //********************************

      //set state of picture exif data
      this.setState({
        locationOfObservation : {
          "__type": "GeoPoint",
          "latitude": lat,
          "longitude": lon
        },
        date: date,
        lat: lat,
        lon: lon,
        latRef: latRef,
        lonRef: lonRef,
      });

      return this;
    });
    this.setState({preview: reader.result});
  }

  reader.readAsDataURL(file);

}
handleDelete(e, image){
  e.preventDefault();
  image.destroy({success: function(model, response) {
  // update state, refresh view
  }});
}
  handleUpload(e){
    e.preventDefault();
    var pic = this.state.pic;
    var image = new ParseFile(pic);
    var user = JSON.parse(localStorage.user)

    image.save({}, {
      data: pic
    }).then((response)=>{
      var imageUrl = response.url;

      var fishPic = new FishPic();

      // var ACL = {
      //   "zml2ZsVqGD": {
      //     "read": true,
      //     "write": true
      //   }
      // }

      fishPic.set({
        name: this.state.name,
        description: "",
        image: imageUrl,
        userId: user.objectId,
        lat: this.state.lat,
        lon: this.state.lon,
        date: this.state.date
      });


      fishPic.setPointer('imageAuthor', '_User', User.current().get("objectId"));

      var collection = this.state.collection;
      collection.add(fishPic)
      this.setState({ collection: collection })

      fishPic.save();
      // this.forceUpDate();
    });
  }
  handlePost(image){
    var imageUrl = image.get('image');
    var user = JSON.parse(localStorage.user);
    var bragPic = new BragPic();
    bragPic.set({
      name: this.state.name,
      description: "",
      image: imageUrl,
      userId: user.objectId,
      date: this.state.date
    });
    console.log('brag', bragPic);
    bragPic.save();

  };

  addComment(e){
    e.preventDefault();
    var comment = comment.get('comment');
    var user = JSON.parse(localStorage.user);
    var comment = new Comments();
    comment.set({
      name: this.state.name,
      description: "",
      comment: comment,
      userId: user.objectId,
      date: this.state.date
    });
    console.log('comment', comment);
    comment.save();

  };
  handleComment(e){
    var comment = new Comments();

  }

  render(){

    var self = this;
    var images = self.state.collection.map(function(image){

      const Location = {
        lat: image.attributes.lat,
        lng: image.attributes.lon
      }
      const markers = [
        {
          location: {
              lat: 34.10241666666667,
              lng: -82.62381111111111
          }
        }
      ]
      var date = image.attributes.date;

      // var newDate = new Date(date);
      //
      // console.log('here', moment(newDate).format('lll'));


      return (
        <div className="wrapper" key={image.cid}>

        <div className="col-sm-6 col-md-3">
        <div className="well" key={image.cid}>
          <a href={image.get('image')}><img src={image.get('image')} alt="..." /></a>

          <div className="caption">
            <p>Nice Fish!!</p>
            <a onClick={() => self.handlePost(image)}>Post to Bragging Rites</a>
            <input className="comment-input" onChange={self.handleComment}placeholder="Comment"/>
            <p><a href="#" onClick={self.addComment}className="btn btn-primary" role="button">Comment</a> <a href="#" onClick={(e)=>self.handleDelete(e, image)} className="btn btn-default" role="button">Delete Post</a></p>
              <ul>
                <li>Date {date}</li>
                <li>Lat: {image.attributes.lat}</li>
                <li>Lng: {image.attributes.lon}</li>
              </ul>
          </div>

        </div>

        <div>
          <div style={{width: 255, height: 300,}}>
            <Maps center={Location} />
          </div>
        </div>
        </div>
        </div>
      )
    });


    return(
      <div className="wrapper">
        <img className="lake5" src="./images/lake8.jpg" alt="" />
          <div className="col-md-12">
              <Header></Header>
          </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="user-data">Keep The Weather Data From Your Fishing Trips</h1>
                <div className="row">
                  <div className="col-md-12">
                  <form encType="multipart/form-data">
                    <input type="file" accept=".jpeg, .jpg, .gif, .PNG" onChange={this.handleImageChange} /><br />
                    <img src={this.state.preview} height="250" width="200" alt="Your Brag Picture Goes Here" />
                  </form>
                    <span className="upload"><button className="signup-btn btn btn-primary" onClick={this.handleUpload}><img src="./images/button-logo1.png"/>Upload Photo</button></span>
                    {images}
                </div>






                </div>

            </div>
          </div>

        </div>
        <Footer />
      </div>
    )
  }
};
module.exports = {
  UserRecords
};
