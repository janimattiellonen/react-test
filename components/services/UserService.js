var async = require('async');
var _ = require('underscore');

UserService = function(db, twitter, moment) {
    this.db 		= db;
    this.twitter 	= twitter;
    this.moment 	= moment;
};

UserService.prototype = (function()
{
    return {
        getCurrentFriends: function(successCallback) {
        	var self = this;
        	this.db.collection("friends").find().toArray(function(error, items) {

        		async.series([
        			function(callback) {
						if (self.userDataIsOld(items)) {
							self.removeFriends();
							self.loadFriendsFromTwitter(callback);
						} else {
							callback(null, true);
						}
					},
					function(callback) {
						self.loadFriends(callback);
					}
				], function(err, results) {
					if (_.isArray(results)) {
						successCallback(results[1]);
					}
				});	
			});
        },

        loadFriends: function(callback) {
        	this.db.collection("friends").find().toArray(function(error, items) {
        		callback(null, items);
        	});
        },

        loadFriendsFromTwitter: function(callback) {
        	var self = this;
			this.twitter.get('friends/list', function(error, data, response){

				if(error) {
					return [];
				} else {

					var friends = [];
					_.each(data.users, function(friend) {
						var friend = {
							name: 			friend.name,
							screenName: 	friend.screen_name,
							description: 	friend.description,
							timestamp: 		self.moment().format(),
						};

						self.db.collection("friends").insert(friend, function(err, result) {

						});

						friends.push(friend);
					});

					callback(null, friends);
				}
			});
        },

        userDataIsOld: function(items) {
        	var self = this;
        	var isOld = false;

        	if (_.size(items) < 5) {
        		return true;
        	}
        	_.each(items, function(item) {
				var date = self.moment(item.timestamp);

				if (self.moment().diff(date, 'days') > 10) {
					isOld = true;
					return isOld;
				}
			});


			return isOld;
        },

        removeFriends: function() {
        	this.db.collection("friends").remove(function(err, result) {
        		
        	});
        }
    }
})();

module.exports = UserService;