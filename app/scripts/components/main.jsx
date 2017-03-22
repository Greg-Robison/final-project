var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

var Header = require('./layouts/header.jsx').Header
var ParseFile = require('../models/parsefile').ParseFile;
var FishPicCollection = require('../models/fishpic').FishPicCollection;
var FishPic = require('../models/fishpic').FishPic;
var User = require('../models/user').User;

class BragBoard extends React.Component {
  constructor(props){
    super(props);

    var self = this;
    var fishPicCollection = new FishPicCollection();

    fishPicCollection.fetch().then(function(){
      self.setState({collection: fishPicCollection});
    });

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

    this.state = {
      preview: null,
      pic: null,
      collection: fishPicCollection
    };



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


    render() {
      var user = User.current();

      var images = this.state.collection.map(function(image){
        return (
          <div key={image.cid} className="wrapper">

          <div className="col-sm-6 col-md-4">
          <div className="well">
            <a href={image.get('image')}><img src={image.get('image')} alt="..." /></a>
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
      <div className="container-fluid">
        <div className="row">
        <div className="col-md-12">
            <Header></Header>
        </div>
        </div>
        <div className="container">




            {images}



    </div>
</div>
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
