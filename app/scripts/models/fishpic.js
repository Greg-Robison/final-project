var $ = require('jquery');
var Backbone = require('backbone');


var FishPic = Backbone.Model.extend({
  idAttribute: 'objectId',
});

var FishPicCollection = Backbone.Collection.extend({
  model: FishPic
});

module.exports = {
  FishPic,
  FishPicCollection
};
