const ejs = require('ejs');
const exec = require('child-process-promise').exec;
const fs = require('fs');
const mkdirp = require('mkdirp');
const pkg = require('../package.json');

const encoding = {encoding: 'utf8'};

Promise.all([
	exec('cssnano src/*.css'),
	exec('browserify -g uglifyify -t [ babelify --presets [ env ] ] src/index.js', {maxBuffer: Infinity})
]).then(results => {
	const distPath = 'dist/' + pkg.name.toLowerCase() + '-' + pkg.version;
	const htmlTemplate = ejs.compile(fs.readFileSync('src/index.ejs', encoding));
	const formatData = {
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

	mkdirp.sync(distPath);
	fs.writeFileSync(
		distPath + '/format.js',
		'window.storyFormat(' + JSON.stringify(formatData) + ');'
	);
});