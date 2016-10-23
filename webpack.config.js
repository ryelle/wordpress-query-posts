var path = require( 'path' );
var webpack = require( 'webpack' );
var NODE_ENV = process.env.NODE_ENV || 'development';
var LodashModuleReplacementPlugin = require( 'lodash-webpack-plugin' );
var webpackConfig;

// This file is written in ES5 because it is run via Node.js and is not transpiled by babel. We want to support various versions of node, so it is best to not use any ES6 features even if newer versions support ES6 features out of the box.
webpackConfig = {

	// Entry points point to the javascript module that is used to generate the script file.
	// The key is used as the name of the script.
	entry: {
		index: './src/index.jsx',
		state: [ './src/state.js' ],
		selectors: [ './src/selectors.js' ],
	},
	output: {
		path: __dirname,
		filename: '[name].js',
		library: '[name]',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	resolve: {
		extensions: [ '', '.js', '.jsx' ],
	},
	devtool: ( 'production' === NODE_ENV ) ? false : '#source-map',
	debug: ( 'production' === NODE_ENV ) ? false : true,
	module: {
		// Webpack loaders are applied when a resource matches the test case
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: [ 'babel', 'eslint' ],
				exclude: /node_modules/,
			},
			{
				test: /\.json$/,
				loader: 'json',
			},
		]
	},
	eslint: {
		configFile: path.join( __dirname, '.eslintrc' ),
		failOnError: true,
		quiet: true,
	},
	node: {
		fs: 'empty',
		process: true
	},

	plugins: [
		new LodashModuleReplacementPlugin,
		new webpack.DefinePlugin( {
			// NODE_ENV is used inside React to enable/disable features that should only
			// be used in development
			'process.env': {
				NODE_ENV: JSON.stringify( NODE_ENV ),
			}
		} )
	]
};

if ( NODE_ENV === 'production' ) {
	// When running in production, we want to use the minified script so that the file is smaller
	webpackConfig.plugins.push( new webpack.optimize.UglifyJsPlugin( {
		compress: {
			warnings: false
		}
	} ) );
}

module.exports = webpackConfig;
