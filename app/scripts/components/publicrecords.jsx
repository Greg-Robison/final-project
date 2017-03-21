// var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');
var Maps = require('./layouts/maps.jsx').Maps;
var Places = require('./layouts/places.jsx').Places;


class PublicRecords extends React.Component {
  render(){
    const Location = {
      lat: 34.94226944444444,
      lng: -82.36524166666666
    }
    const markers = [
      {
        loacation: {
            lat: 34.94226944444444,
            lng: -82.36524166666666
        }
      }
    ]
    return(
      <div>
        this is the React App
        <div style={{width: 300, height: 600,}}>
          <Maps center={Location} markers={markers} />
        </div>
      </div>
    )
  }
}



module.exports = {
  PublicRecords
};
