var Backbone = require('backbone');

var ParseFile = Backbone.Model.extend({
  urlRoot: function(){
    return "https://robison.herokuapp.com/files/" + this.get('name');
  }
});

module.exports = {
  ParseFile
};
