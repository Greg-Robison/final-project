var $ = require('jquery');
var Backbone = require('backbone');

var ParseFile = require('../models/parsefile').ParseFile;

var FishPic = Backbone.Model.extend({
  urlRoot: "https://robison.herokuapp.com/classes/Fishpic",
});

var FishPicCollection = Backbone.Collection.extend({
  model: FishPic,
  url: function(){
    return "https://robison.herokuapp.com/classes/Fishpic"
  },

  parse: function(data){
    return data.results;
  }
});

module.exports = {
  FishPic,
  FishPicCollection
};
