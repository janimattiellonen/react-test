var React = require('react');

var Friend = React.createClass({

	render: function() {
		return (
			<div className="Friend">
				<h2>{this.props.friendName}</h2>
			</div>
		);
	}

});

module.exports = Friend;