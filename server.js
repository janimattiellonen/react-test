var Config = require('./config');
var Twitter = require('twitter');
var express = require('express');
var _ = require('underscore');

var app = module.exports = express();

app.use(express.static(__dirname + '/web'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/web/index.html');
})


app.get('/tweets', function(req, res) {

	var client = new Twitter({
		consumer_key: Config.twitter.consumerKey,
		consumer_secret: Config.twitter.consumerSecret,
		access_token_key: Config.twitter.accessTokenKey,
		access_token_secret: Config.twitter.accessTokenSecret
	});

	client.get('friends/list', function(error, data, response){

		if(error) {
			console.log(error + ": " + response.message);
			res.send(error);
		} else {

		var friends = [];

		_.each(data.users, function(friend) {
				console.log("name: " + JSON.stringify(friend));
				friends.push({
					name: friend.name,
					screenName: friend.screen_name,
					description: friend.description
				})
			})
		}

		res.send(friends);

	});

	
});

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})