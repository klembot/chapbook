const fs = require('fs-extra');
const pkg = require('../package.json');

fs.readFile('dist/index.html', {encoding: 'utf8'}).then(data => {
	const formatPath = `dist/${pkg.name.toLowerCase()}-${pkg.version}`;

	fs.mkdirp(formatPath)
		.then(() =>
			fs.writeFile(
				`${formatPath}/format.js`,
				'window.storyFormat(' +
					JSON.stringify({
						author: pkg.author.replace(/ <.*>/, ''),
						description: pkg.description,
						image: 'logo.svg',
						name: pkg.name,
						proofing: false,
						source: data,
						url: pkg.repository,
						version: pkg.version
					}) +
					');'
			)
		)
		.then(() => console.log(`Wrote ${formatPath}/format.js.`))
		.then(() => fs.copy('logo.svg', `${formatPath}/logo.svg`))
		.then(() => console.log(`Copied ${formatPath}/logo.svg.`));
});
