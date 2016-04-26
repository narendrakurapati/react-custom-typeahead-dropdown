var render = require("./type-a-head/type-a-head.jsx")

var elem = document.getElementById("dropdown");

var listItems = [{
	"id" : "1",
	"description" : "First Owner Purchase"
}, {
	"id" : "2",
	"description" : "Second Hand"
}, {
	"id" : "3",
	"description" : "Second Hand Imported"
}];

var data = {
	'title': "Title",
	'placeHolder': "PlaceHolder",
	'items': listItems,
	'idToRender': 'id', //Id to render in list for item
	'nameToRender': 'description', //Name to render in list for item
	'selectedItem': {
		//"id" : "2",
		//"description" : "Second Hand"
	},
	'selectCallback':selectCallback,
	'allowedChars': null, // /\d/, //RegEx for restricting characters to enter
	'isDisabled': false
}

function selectCallback(item) {
	console.log("Selected item:" + item.description)
}

render(elem, data);