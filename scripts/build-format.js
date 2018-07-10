const pify = require('pify');
const fs = pify(require('fs'));
const mkdirp = pify(require('mkdirp'));
const pkg = require('../package.json');

fs.readFile('dist/index.html', {encoding: 'utf8'}).then(data => {
	const formatPath = `dist/${pkg.name.toLowerCase()}-${pkg.version}`;

	mkdirp(formatPath)
		.then(() =>
			fs.writeFile(
				`${formatPath}/format.js`,
				'window.storyFormat(' +
					JSON.stringify({
						author: pkg.author.replace(/ <.*>/, ''),
						description: pkg.description,
						name: pkg.name,
						proofing: false,
						source: data,
						url: pkg.repository,
						version: pkg.version
					}) +
					');'
			)
		)
		.then(() => console.log(`Wrote ${formatPath}/format.js.`));
});
