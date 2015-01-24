var React = require('react');
var Friend = require('./Friend');
var Immutable = require('immutable');

var FriendList = React.createClass({

	render: function() {
		return (
			<div>
				{this.props.friends.map(function(friend) {
					return <Friend friend={friend} />
				}).toArray()}
			</div>
		);
	}

});

module.exports = FriendList;