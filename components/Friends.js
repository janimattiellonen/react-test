var React = require('react');
var Friend = require('./Friend');
var FriendList = require('./FriendList');

var Immutable = require('immutable');
var $ = require('jquery');

var Friends = React.createClass({

	getInitialState: function() {
		return {
			'friends': Immutable.List([]), 
		};
	},

	componentDidMount: function() {
		console.log("componentDidMount");
		var self = this;


		$.get('/friends', function(data) {
    		self.setState({
    			'friends': Immutable.List(data)
    		})

    		console.log("state: " + this.state);
    	});

	},

	render: function() {
		return (
			<div className="friends">
				<FriendList friends={this.state.friends} />
			</div>
		);
	}

});


module.exports = Friends;