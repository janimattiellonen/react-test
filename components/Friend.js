var React = require('react');

var Friend = React.createClass({

	render: function() {
		return (
			<div className="Friend">
				<h2>{this.props.friend.name} ({this.props.friend.screenName})</h2>

				<p>{this.props.friend.description}</p>

			</div>
		);
	}

});

module.exports = Friend;