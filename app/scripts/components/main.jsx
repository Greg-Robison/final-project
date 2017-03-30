var $ = window.$ = window.jQuery = require('jquery');
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
var CommentsCollection = require('../models/comment.js').CommentsCollection;
var Comments = require('../models/comment.js').Comments;

require('bootstrap-sass');

class BragBoard extends React.Component {
  constructor(props){
    super(props);

    var self = this;
    var bragPicCollection = new BragPicCollection();

    bragPicCollection.fetch().then(function(){
      self.setState({collection: bragPicCollection});

    });

    this.addComment = this.addComment.bind(this);
    this.handleComment = this.handleComment.bind(this);
    //this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      pic: null,
      collection: bragPicCollection
    }

  }

  addComment(e){
    console.log('comment on submit', this.state.comment);
    e.preventDefault();
    var user = JSON.parse(localStorage.user);
    var comment = new Comments();
    comment.set({
      name: user.objectId,
      comment: this.state.comment,
      userId: user.objectId,
      date: new Date()
    });
    console.log('comment', comment);
    comment.save();

  }

  handleComment(e){
    e.preventDefault();
    console.log('this', this);
    console.log('event', e);
    // this.setState({
    //   comment: e.target.value
    // })
    console.log('comment on input', this.state.comment);
  }

  render() {
    var self = this;
    var user = User.current();

    var images = this.state.collection.map(function(image, index){
      return (<BragImage key={index} image={image} /> )
    });
      return (
        <div>
          <img className="lake5" src="./images/lake4.jpg" alt="" />
          <div className="container">
            <div className="row">
            <div className="col-md-12">
                <Header></Header>

            </div>
            <div className="brags">
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

class BragImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      comments: this.props.image.get('comments')
    }

    console.log('here', this.props.image);

    this.handleComment = this.handleComment.bind(this);
    this.saveComment = this.saveComment.bind(this);
  }

  handleComment(e) {
    this.setState({ 'comment': e.target.value })
  }

  saveComment(e) {
    e.preventDefault();
    // console.log(User.current().get('name'))
    var image = this.props.image;
    var comments = image.get('comments') || [];

    comments.push({text :this.state.comment, author: User.current().get('name')});
    image.set('comments', comments);
    this.setState({ 'comments': comments })
    // console.log('image', image);
    image.save();
  }




  render() {
    console.log(this.props);
    var comments;
    if(this.state.comments){
      comments = this.state.comments.map(function(comment, index){
        return (
          <li key={index} className="list-group-item">
            <span>{comment.author}</span>
            <span> Posted {comment.text}</span>
          </li>
        )
      });
    }
    return (
      <div className="wrapper">
      <div className="col-sm-6 col-md-4">
      <div className="well pic-well">
        <a href={this.props.image.get('image')}><img src={this.props.image.get('image')} alt="..." /></a>
        <div className="caption">
          <div className="input"><input type="text" className="comment-input" name="comment" value={this.state.comment} onChange={this.handleComment} placeholder="Comment"/></div>

          <p><button onClick={this.saveComment} className="add-show btn btn-primary" role="button">Comment</button><button data-toggle="collapse" data-target={"#toggle" + this.props.image.cid} className="add-show btn btn-primary">Show/Hide Comments</button></p>
          <div className="well">
            <ul id={"toggle" + this.props.image.cid} className="collapse list-group">

              {comments}

            </ul>
          </div>
        </div>
      </div>
      </div>
      </div>
    )
  }
}


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
