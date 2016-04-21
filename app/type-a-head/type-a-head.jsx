var React = require("react");
var ReactDom = require("react-dom");

var TypeaHead = React.createClass({
	render: function() {
		return (
			<div>TypeAHead</div>
		);
	}
});

module.exports = function render(elem,  payload) {
	ReactDom.render(<TypeaHead></TypeaHead>, elem);
}