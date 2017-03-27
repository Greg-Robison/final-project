var React = require('react');
var GoogleMapLoader = require('react-google-maps').GoogleMapLoader;
var GoogleMap = require('react-google-maps').GoogleMap;
var Marker = require('react-google-maps').Marker;


class Maps extends React.Component{

  render(){
    const mapContainer = <div style={{height: '100%', width: '100%'}}></div>


    return(
      <GoogleMapLoader
        containerElement = { mapContainer }
        googleMapElement = {
          <GoogleMap
            defaultZoom={17}
            defaultCenter={this.props.center}
            options={{streetViewControl: true, mapTypeControl: true}}>

          </GoogleMap>

        } />
    )
  }
}

module.exports = {
  Maps
};
