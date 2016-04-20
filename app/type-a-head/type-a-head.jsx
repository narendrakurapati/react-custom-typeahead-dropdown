import React from "react";
import ReactDom from "react-dom";

class TypeaHead extends React.component {
	render() {
		return (
			<div>TypeAHead</div>
		);
	}
}

function render(elem,  payload) {
	ReactDom.render(<TypeaHead></TypeaHead>, elem);
}