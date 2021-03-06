var $ = window.$ = window.jQuery = require('jquery');
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
var NoteCollection = require('../models/note.js').NoteCollection;
var Note = require('../models/note.js').Note;

require('bootstrap-sass');

class UserRecords extends React.Component {
  constructor(props){
    super(props);
    var self = this;
    var userId = User.current().get('objectId');
    var fishPicCollection = new FishPicCollection();

    fishPicCollection.parseWhere('imageAuthor', '_User', userId).fetch().then(function(){
      console.log('here', fishPicCollection);
      self.setState({
        collection: fishPicCollection
      });
    });

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleNote = this.handleNote.bind(this);
    this.addNote = this.addNote.bind(this);
    this.logOut = this.logOut.bind(this);

    this.state = {
      preview: null,
      pic: null,
      collection: fishPicCollection,
      lat: null,
      lon: null,
      latRef: null,
      lonRef: null,
      note: null,
      notes: []
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

      // fishPic.setPointer('imageAuthor', '_User', User.currentUser().get('objectId') );

      fishPic.set({
        name: this.state.name,
        description: "",
        image: imageUrl,
        userId: user.objectId,
        lat: this.state.lat,
        lon: this.state.lon,
        date: this.state.date,
        notes: this.state.notes
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

  addNote(image){
    console.log('image', image);
    var note = this.state.note;
    console.log(note);
    image.get('notes').push(note);
    image.save();
    this.forceUpdate();
    this.refs.addNotes.value = '';
  }

  handleNote(e){
    e.preventDefault();

    this.setState({
      note: e.target.value
    });
  }


  render(){
    var notes;
    if(this.state.notes){
      notes = this.state.notes.map(function(notes, index){
        return (
          <li key={index} className="list-group-item">
            <span>{notes.author}</span>
            <span>{notes.text}</span>
          </li>
        )
      });
    }

    var self = this;
    var images = self.state.collection.map(function(image){

      // var image = image;
      const Location = {
        lat: image.attributes.lat,
        lng: image.attributes.lon
      }
      const markers = [
        {
          location: {
              lat: 34.94298055555555,
              lng: -82.36498333333333
          }
        }
      ]
      var date = image.attributes.date;
      var notes = image.get('notes').map(function(note, index){
        return(

          <li className="list-group-item" key={index}>{note}</li>
        )
      });


      return (
        <div className="wrapper" key={image.cid}>

        <div className="col-sm-6 col-md-4">
        <div className="well ws" key={image.cid}>
          <a href={image.get('image')}><img src={image.get('image')} alt="..." /></a>

          <div className="caption">

            <div className="post"><button className="post-button btn btn-default" onClick={() => self.handlePost(image)}>Post to Bragging Rites</button></div>
            <div className="input"><input type="text" className="comment-input" name="note" value={self.state.name} onChange={self.handleNote} placeholder="Your Notes" ref="addNotes"/></div>
            <span><div className="set"><button onClick={(e) => {self.addNote(image)}} className="add-show btn post-button">Add Notes</button>
            <button data-toggle="collapse" data-target={"#toggles" + image.cid} className="add-show btn post-button">Show Notes</button></div></span>
             <div className="set"><button onClick={(e)=>self.handleDelete(e, image)} className="action btn btn-danger">Delete Post</button></div>
              <ul>
                <li>Date {date}</li>
                <li><a href="http://www.wunderground.com/weatherstation/WXDailyHistory.asp?ID=MD9030" target="_blank"><h3 className="weather-info">Weather Info</h3></a></li>
                <li>Lat: {image.get('lat')}</li>
                <li>Lng: {image.get('lon')}</li>
                <li><button className="btn post-button" data-toggle="collapse" data-target={"#toggle" + image.cid}>Show/Hide Map</button></li>
              </ul>





        <ul id={"toggles" + image.cid} className="collapsing list-group">

            {notes}


        </ul>


        <ul id={"toggle" + image.cid} className="collapsing map-show">
          <li style={{width: 330, height: 400,}}>
            <Maps center={Location} />
          </li>
        </ul>
        </div>
        </div>
        </div>
        </div>
      )
    });


    return(
      <div className="wrapper">
        <img className="lake5" src="./images/lake2.jpg" alt="" />
        <div className="row">
          <div className="col-md-12">

              <Header></Header>

          </div>
          </div>
        <div className="container">
          <div className="user row">
            <div className="col-md-12">
              <h1 className="user-data">Track Your Fishing Trips</h1>
                <div className="row">
                  <div className="col-md-12">

                  <form encType="multipart/form-data">
                    <input type="file" accept=".jpeg, .jpg, .gif, .PNG" onChange={this.handleImageChange} /><br />
                    <img src={this.state.preview} height="250" width="200" alt="Your Brag Picture Goes Here" />
                  </form>

                    <div className="upload-button"><span className="upload"><button className="btn post-button" onClick={this.handleUpload}>Upload Photo</button></span></div>

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
