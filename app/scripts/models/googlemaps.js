var Backbone = require('backbone');

var Google = Backbone.Model.extend({
urlRoot: function(){
  return "https://maps.googleapis.com/maps/api/js?key=AIzaSyCsYp-MXDTKFzCS_KnQz6NqNrS9jtgPGLY&callback=initMap";

},
