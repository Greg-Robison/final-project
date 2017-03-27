var Backbone = require('backbone');

var parse = require('../setup').parse;

var ParseModel = Backbone.Model.extend({
 idAttribute: 'objectId',
 save: function(key, val, options){
   delete this.attributes.createdAt;
   delete this.attributes.updatedAt;

   return Backbone.Model.prototype.save.apply(this, arguments);
 },
 setPointer: function(field, parseClass, objectId){
   var pointerObject = {
     "__type": "Pointer",
     "className": parseClass,
     "objectId": objectId
   };

   this.set(field, pointerObject);

   return this;
 }
});

var ParseCollection = Backbone.Collection.extend({
 whereClause: {},
 parseWhere: function(field, value, objectId){
   if(objectId){
     value = {
       className: value,
       objectId: objectId,
       '__type': 'Pointer'
     };
   }
   this.whereClause[field] = value;

   return this;
 },
 url: function(){
   var url = this.baseUrl;
   console.log('url', url);
   if(Object.keys(this.whereClause).length > 0){
     url += '?where=' + JSON.stringify(this.whereClause);
     console.log('here', url);
     this.whereClause = {};
   }
   return url;
 },
 parse: function(data){
   return data.results;
 }
});

var ParseFile = ParseModel.extend({
 urlRoot: function(){
   return "https://robison.herokuapp.com/files/" + this.get('name');
 }
});

module.exports = {
 ParseModel,
 ParseCollection,
 ParseFile
}
