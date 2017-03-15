var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

var ParseFile = require('../models/parsefile').ParseFile;
var FishPicCollection = require('../models/fishpic').FishPicCollection;
var FishPic = require('../models/fishpic').FishPic;

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
    });
  }


    render() {
      var images = this.state.collection.map(function(image){
        return (
          <div className="thumbnail" key={image.cid}>
            <a href={image.get('image')}><img src={image.get('image')} alt="..." /></a>
            <div className="caption">
              <p>Thumbnail label</p>
              <p>Nice Fish!!</p>
              <p><a href="#" className="btn btn-primary" role="button">Comment</a> <a href="#" className="btn btn-default" role="button">Delete</a></p>

            </div>
          </div>
        )

      })
        return (
    <div className="container">
      <div className="row">
        <form encType="multipart/form-data">
        <input type="file" accept=".jpeg, .jpg, .gif, .PNG" onChange={this.handleImageChange} /><br />
          <img src={this.state.preview} height="250" width="200" alt="Your Brag Picture Goes Here" />
            <button className="logo-button" onClick={this.handleUpload}><img src="./images/logo2.png"/></button>
            <h2 className="click">Click Icon to Upload</h2>
            </form>
              <div className="row">

                <div className="col-sm-6 col-md-4">
                  {images}
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
