var React = require("react");
var ReactDom = require("react-dom");


//Input element for number only input
var InputField = React.createClass({
	getInitialState: function() {
		return {
			value: ""
		}
	},
	
	updateValue: function(value) {
		this.setState({'value': value});
	},
	
	validateInput: function(e) {
		var value = this.refs.input.value;
		this.updateValue(value);
		this.onChange(value);
	},
	
	render: function() {
		var props = this.props.data;
		this.onClick = props.onClick;
		this.onChange = props.onChange;
		return (
			<input type="text" onClick={this.onClick} className="input-search" placeholder={props.placeholder} value={this.state.value} title={props.title} onKeydown={this.validateInput} ref="input" />
		);
	},
	
	componentDidMount: function() {
		this.updateValue(this.props.data.value);
	},
	
	componentWillReceiveProps: function(nextProps) {
		this.updateValue(nextProps.data.value);
	}
});

var DisabledFied = React.createClass({
	render: function() {
		var data = this.props.data;
		return (
			<input type="text" placeholder={data.placeHolder} title={data.title} value={data.value} disabled/>
		);
	}
});

var DropdownListItem = React.createClass({
	onSelect: function() {
		this.props.onSelect(this.props.item);
	},
	render: function() {
		var props = this.props;
		var item = props.item;
		var selectedItem = props.selectedItem || {};
		var idToRender = props.idToRender;
		return (
			<li 
				className={"drpdwn-lst-itm" + ((selectedItem[idToRender] == item[idToRender])?" active":"")} 
				id={item[idToRender]} onClick={this.onSelect}>
				<a tabindex="-1" ng-keyup={this.focusNextElement}>{item[props.nameToRender]}</a>
			</li>
		);
	}
});

var DropdownList = React.createClass({
	render: function() {
		var props = this.props.data;
		var items = props.items || [];
		return (
			<ul className="drpdwn-lst">
				{
					items.map(function(item, index) {
						return (<DropdownListItem key={index} item={item} idToRender={props.idToRender} nameToRender={props.nameToRender} onSelect={props.onSelect} selectedItem={props.selectedItem}></DropdownListItem>)
					})
				}
			</ul>
		);
	}
});



//Wrapper for typeahead dropdown
var TypeaHead = React.createClass({
	getInitialState: function() {
		return {
			showList: false,
			value: "",
			filteredList: []
		}
		
	},
	toggleDropdown: function(e) {
		if(!this.isDisabled){
			this.setState({
				showList: !this.state.showList
			});
		}
	},
	filterList: function(value) {
		var key = this.nameToRender;
		var filteredList = undefined;
		if (value) {
			value = value.toLowerCase();
			filteredList = this.items.filter(function(item){
				return (item[key].toLowerCase().indexOf(value) !== -1);
			});
		} else {
			filteredList = this.items;
		}
		this.setState({
			value: value,
			filteredList: filteredList
		})
	},
	handleItemSelect: function(item) {
		this.currItem = item;
		this.props.data.selectCallback(item);
		this.setState({
			showList: false,
			value: item[this.nameToRender]
		})
	},
	render: function() {
		var props = this.props;
		var data = this.props.data || {};
		var payload = {
			'title': data.title,
			'placeholder': data.placeHolder,
			'value': this.state.value, //data.selectedItem[data.nameToRender],
			'onClick': this.toggleDropdown,
			'onChange': this.filterList
		}
		var ddData = {
			'items': data.items,
			'idToRender': data.idToRender,
			'nameToRender': data.nameToRender,
			'onSelect': this.handleItemSelect,
			'selectedItem': this.currItem || data.selectedItem
		}
		return (
			<div className="tah-wrpr">
				<div className="tah" >
					{
						data.isDisabled ? (
							<DisabledFied data={payload}></DisabledFied>
						) : (
							<InputField data={payload}></InputField>
						)
					}
					<span className="dropdown-icon" onClick={this.toggleDropdown}></span>
					{
						this.state.showList ? (
							<DropdownList data={ddData}></DropdownList>
						) : ""
					}
			   </div>
		   </div>
		);
	},
	componentDidMount: function() {
		var data = this.props.data || {};
		this.idToRender = data.idToRender;
		this.nameToRender = data.nameToRender;
		this.isDisabled = data.isDisabled;
		this.currItem = data.selectedItem || {};
		this.items = data.items || [];
		this.filterList(data.selectedItem[data.nameToRender]);
	}
});

module.exports = function render(elem,  payload) {
	ReactDom.render(<TypeaHead data={payload}></TypeaHead>, elem);
}