const fs = require('fs-extra');
const pkg = require('../package.json');

['full', 'micro'].forEach(variant => {
	fs.readFile(`dist/${variant}/index.html`, {encoding: 'utf8'}).then(data => {
		const formatPath = `dist/${pkg.name.toLowerCase()}-${pkg.version +
			(variant !== 'full' ? '-' + variant : '')}`;

		fs.mkdirp(formatPath)
			.then(() =>
				fs.writeFile(
					`${formatPath}/format.js`,
					'window.storyFormat(' +
						JSON.stringify({
							author: pkg.author.replace(/ <.*>/, ''),
							description:
								pkg.description +
								(variant === 'micro'
									? ' This variant contains no testing-related code, and as a result, loads faster for players.'
									: ''),
							image: 'logo.svg',
							name: pkg.name + (variant === 'micro' ? ' μ' : ''),
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
});
