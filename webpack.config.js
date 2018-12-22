const fs = require('fs');
const cssPlugin = require('mini-css-extract-plugin');
const htmlPlugin = require('html-webpack-plugin');
const path = require('path');
const TwineStory = require('twine-utils/story');

const isRelease = process.env.NODE_ENV === 'production';
const browserSupport = ['iOS > 9', 'IE 11', '>10%'];
const htmlMinifyOptions = {collapseWhitespace: true};

const args = require('yargs')
	.default('example', 'hello-world')
	.alias('e', 'example').argv;

const config = {
	devServer: {
		stats: 'minimal'
	},
	mode: isRelease ? 'production' : 'development',
	module: {
		rules: [
			{
				test: /\.jsx$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['preact']]
					}
				}
			},
			{
				test: /\.scss$/,
				use: [
					cssPlugin.loader,
					{loader: 'css-loader', options: {minimize: isRelease}},
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new cssPlugin({filename: '[name].css'}),
		new htmlPlugin({
			inject: !isRelease,
			minify: isRelease && htmlMinifyOptions,
			template: 'src/index.ejs',

			templateParameters(compilation, assets, options) {
				if (isRelease) {
					return {
						storyData: '{{STORY_DATA}}',
						inline: true,
						assets,
						compilation,
						options
					};
				}

				const story = new TwineStory();

				story.mergeTwee(
					fs.readFileSync(
						path.resolve(
							__dirname,
							`./examples/${args.example}.txt`
						),
						{
							encoding: 'utf8'
						}
					)
				);

				story.attributes.name = args.example;
				story.setStartByName('Start');

				return {storyData: story.toHtml(), inline: false};
			}
		})
	],
	resolve: {
		extensions: ['.js', '.jsx']
	}
};

if (isRelease) {
	config.module.rules.push({
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: [['env', {targets: {browsers: browserSupport}}]]
			}
		}
	});
}

module.exports = config;
