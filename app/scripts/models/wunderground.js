var Backbone = require('backbone');

var Wunderground = Backbone.Model.extend({
urlRoot: function(){
  return "https://api.wunderground.com/api/7f941aa7f5bbf3a0/conditions/q/SC/Greenville.json";

},
sync: function(method, model, options){
  options = options || {};
  options.dataType = "jsonp";
  return Backbone.Model.prototype.sync.call(this, method, model, options)
},
parse: function(data){
  return data.current_observation;
}
});


module.exports = {
  Wunderground
};
