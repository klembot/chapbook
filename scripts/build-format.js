const ejs = require('ejs');
const exec = require('child-process-promise').exec;
const fs = require('fs');
const {minify:minifyHtml} = require('html-minifier');
const mkdirp = require('mkdirp');
const pkg = require('../package.json');

const encoding = {encoding: 'utf8'};

Promise.all([
	exec('postcss src/index.css -c'),
	exec('rollup --config', {maxBuffer: Infinity})
]).then(results => {
	const distPath = 'dist/' + pkg.name.toLowerCase() + '-' + pkg.version;
	const htmlTemplate = ejs.compile(fs.readFileSync('src/index.ejs', encoding));
	let formatData = {
		author: pkg.author.replace(/ <.*>/, ''),
		description: pkg.description,
		name: pkg.name,
		proofing: false,
		source: htmlTemplate({
			style: results[0].stdout,
			script: results[1].stdout
		}),
		url: pkg.repository,
		version: pkg.version
	};

	if (process.env.NODE_ENV === 'production') {
		formatData.source = minifyHtml(
			formatData.source,
			{
				collapseBooleanAttributes: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				removeComments: true,
				removeRedundantAttributes: true				
			}
		);
	}

	mkdirp.sync(distPath);
	fs.writeFileSync(
		distPath + '/format.js',
		'window.storyFormat(' + JSON.stringify(formatData) + ');'
	);
}).catch(e => {
	console.log('Build failed', e);
});