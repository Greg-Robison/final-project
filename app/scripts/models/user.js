var $ = require('jquery');
var Backbone = require('backbone');

var parse = require('../setup.js');

var User = Backbone.Model.extend({
idAttribute: 'objectId',
urlRoot: function(){
  return parse.BASE_API_URL + '/users';
}
},
{
  login: function(cridentials, callback){
    var url = parse.BASE_API_URL + '/login?' + $.param(cridentials);
    $.get(url).then(data => {

      var newUser = new User(data);
      User.store(newUser);
      callback(newUser);
    });
  },
  singup: function(creds){
    var newUser = new User(creds);
    newUser.save().then((response) => {
      User.store(newUser);
    });
    return newUser;
  },
  logout: function(){
    var url = parse.BASE_API_URL + '/logout?';
    $.post(url).then(event=>console.log(event));
  },
  store: function(user){
    localStorage.setItem('user', JSON.stringify(user.toJSON()));
  },
  current: function(){
    var user = localStorage.getItem('user');


    if(!user){
      return false;
    }

    var currentUser = new User(JSON.parse(user));


    if(!currentUser.get('sessionToken')){
      return false;
    }

    // console.log('currentUser', currentUser);
    return currentUser;
  }
});

module.exports = {
  User
};
