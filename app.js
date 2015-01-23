var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

var React = require('React'); 

React.render(
  <h1>Hello, world!</h1>, document.getElementById('app')
);

client.get('favorites/list', function(error, params, response){

    if(error) throw error;

    console.log("wut: " + params);  // The favorites.

    console.log("wut: " + response);  // Raw response object.


});