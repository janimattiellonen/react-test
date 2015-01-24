var React = require('react');
var Friend = require('./Friend');

var Friends = React.createClass({

	render: function() {
		return (
			<div className="friends">
				<Friend friendName="James Dean"/>
				<Friend friendName="Peter Hunt" />
			</div>
		);
	}

});

module.exports = Friends;