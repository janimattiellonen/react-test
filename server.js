var Config = require('./config');
var Twitter = require('twitter');
var express = require('express');
var _ = require('underscore');
var moment = require('moment');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/twitter", {native_parser:true});
var UserService = require('./components/services/UserService');

var async = require('async');
var app = module.exports = express();

app.use(express.static(__dirname + '/web'));

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/web/index.html');
})

app.get('/friends', function(req, res) {

	// 1) Check if we need to update current user list
		// a) list has expired
		// b) there are no friends
	// 2) If we need to update then
		// 1) remove all users
		// 2) fetch a new list from Twitter
		// 3) add users
	// 3) Fetch user list
	

	var client = new Twitter({
		consumer_key: Config.twitter.consumerKey,
		consumer_secret: Config.twitter.consumerSecret,
		access_token_key: Config.twitter.accessTokenKey,
		access_token_secret: Config.twitter.accessTokenSecret
	});


	var userService = new UserService(db, client, moment);

	userService.getCurrentFriends(function(users) {
		res.send(users);
	});

});

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})