// var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');
var Maps = require('./layouts/maps.jsx').Maps;
var Places = require('./layouts/places.jsx').Places;
var FishPicCollection = require('../models/fishpic').FishPicCollection;
var FishPic = require('../models/fishpic').FishPic;
// var UserRecords = require('./userrecords.jsx').UserRecords;


class PublicRecords extends React.Component {
  constructor(props){
    super(props);
    var self = this;
  }
  render(){
    const Location = {
      lat: this.props.lat,
      lng: this.props.lng
    }
    const markers = [
      {
        location: {
            lat: this.props,
            lng: this.props
        }
      }
    ]
    return(
      <div>
        <div style={{width: 200, height: 300,}}>
          <Maps center={Location} markers={markers} />
        </div>
      </div>
    )
  }
}



module.exports = {
  PublicRecords
};
