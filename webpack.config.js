const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		main: './main.js',
	},
	devtool: 'source-map',

	devServer: {
		contentBase: './dist',
		watchContentBase: true,
		hot: true,
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
	     rules: [
	       {
	         test: /\.css$/,
	         use: [
	           'style-loader',
	           'css-loader'
	         ]
       }
     ]
   }
};

