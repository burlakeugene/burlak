const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: [
		'./src/common.js',
	],
	output: {
		filename: './js/bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'source-map',
	module: {
		rules: [{
		    test: /\.js$/,
		    loader: 'babel-loader',
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
	]
};