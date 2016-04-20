var path = require('path');
var webpack = require('webpack');

var APP = __dirname + '/app';
module.exports = {
	context: APP,
	entry: {
		app: './main.js'
	},
	output: {
		path: APP + '/dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /.jsx?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['es2015', 'react']
			}
		}, {
			test: /\.css$/,
			loader: "style!css"
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
    },
	devtool: "sourcemap",
	debug: true
};