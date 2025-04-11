/**
 * Webpack main configuration file
 */

const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const environment = require('./configuration/environment');

const templateFiles = fs
	.readdirSync(path.resolve(environment.paths.source, 'html'))
	.filter((file) =>
		['.html', '.ejs'].includes(path.extname(file).toLowerCase())
	)
	.map((filename) => ({
		input: filename,
		output: filename.replace(/\.ejs$/, '.html'),
	}));

const htmlPluginEntries = templateFiles.map(
	(template) =>
		new HTMLWebpackPlugin({
			minify: false,
			inject: 'body',
			hash: false,
			filename: template.output,
			template: path.resolve(environment.paths.source, 'html', template.input),
			favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
		})
);

module.exports = {
	entry: {
		app: path.resolve(environment.paths.source, 'js', 'app.js'),
	},
	output: {
		filename: 'js/[name].js',
		path: environment.paths.output,
	},
	module: {
		rules: [
			{
				test: /\.((sa|sc)ss)$/i,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: false,
						},
					},
					'postcss-loader',
					{
						loader: 'group-css-media-queries-loader',
						options: { 
							sourceMap: false,
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						"@babel/preset-env"
					],
				},
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: environment.limits.images,
					},
				},
				generator: {
					filename: 'fonts/[name].[hash:6][ext]',
				},
			},
			{
				test: /\.ejs$/,
				use: {
					loader: 'ejs-easy-loader',
				},
			},
		],
	},
	optimization: {
		minimizer: [
			'...',
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		}),
		new CleanWebpackPlugin({
			verbose: true,
			cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(environment.paths.source, 'images'),
					to: path.resolve(environment.paths.output, 'images'),
					toType: 'dir',
					globOptions: {
						ignore: ['*.DS_Store', 'Thumbs.db'],
					},
				},
				{
					from: path.resolve(environment.paths.source, 'videos'),
					to: path.resolve(environment.paths.output, 'videos'),
					toType: 'dir',
					globOptions: {
						ignore: ['*.DS_Store', 'Thumbs.db'],
					},
				},
				{
					from: path.resolve(environment.paths.source, 'docs'),
					to: path.resolve(environment.paths.output, 'docs'),
					toType: 'dir',
					globOptions: {
						ignore: ['*.DS_Store', 'Thumbs.db'],
					},
				},
				{
					from: path.resolve(environment.paths.source, 'fonts'),
					to: path.resolve(environment.paths.output, 'fonts'),
					toType: 'dir',
					globOptions: {
						ignore: ['*.DS_Store', 'Thumbs.db'],
					}
				}
			],
		}),
	].concat(htmlPluginEntries),
	target: 'web',
};
