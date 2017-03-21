var $ = require('jquery');
var Backbone = require('backbone');

var ParseModel = require('../models/parsefile').ParseModel;
var ParseCollection = require('../models/parsefile').ParseCollection;
var ParseFile = require('../models/parsefile').ParseFile;


var Comments = ParseModel.extend({
  urlRoot: "https://robison.herokuapp.com/classes/Comment",
});

var CommentsCollection = ParseCollection.extend({
  model: Comments,
  url: function(){
    return "https://robison.herokuapp.com/classes/Comment"
  },
//   //***********//
// var Fishpics = Parse.Object.extend('Fishpics');
// var query = new Parse.Query(Fishpics);
//
// query.include('imageAuthor');
//
// query.find().then(function(results){
//   var fishpicsArray = new Array();
//   for(i in results){
//     var obj = results[i];
//     var fishpicName = obj.get('name');
//     var imageMessage = obj.get('imageMessage');
//     var imageAuthor = obj.get('imageAuthor');
//
//     fishpicsArray.push({
//       post:{
//         name: postName,
//         msg: imageMessage
//       },
//       author: imageAuthor
//     });
//   }
// })
//************//
  parse: function(data){
    return data.results;
  }
});

module.exports = {
  CommentsCollection,
  Comments
};
