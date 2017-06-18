var webpack = require("webpack");
var path = require("path");

module.exports = {
	context: __dirname,
	devtool: 'sourcemap',
	entry: [
		'babel-polyfill',
		'./wp/main.js'
	],
	output: {
		path: path.join(__dirname, "dist"),
		filename: "bundle.js", // no hash in main.js because index.html is a static page
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
			},
			{
				test: /\.css$/,
				loader: 'vue-style-loader!css-loader'
			},
			{
				test: /\.scss$/,
				loader: 'vue-style-loader!css-loader!sass-loader'
			},
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'stage-3'],
				}
			},
			{
				test: /\.(png|gif|jpg|jpeg|svg)$/,
				loader: "url-loader",
				query: {
					limit: 10000,
          name: '[name].[ext]?[hash:7]',
				}
			}
		],
	},
  resolve: {
    alias: {'~': path.resolve(__dirname)}
  },
	plugins: [
		new webpack.DefinePlugin({
		  'process.BROWSER_BUILD': true,
		})
	]
	// vue: {
	// 	loaders: {
	// 		'scss': 'style!css!sass'
	// 	}
	// }
};
