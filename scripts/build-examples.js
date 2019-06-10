/*
This script will only work when run by npm/yarn because it relies on entwine
being available in the path.
*/

const exec = require('child-process-promise').exec;
const fs = require('fs-extra');
const path = require('path');
const titleCase = require('title-case');
const pkg = require('../package.json');

fs.readdir(path.resolve('examples')).then(files => {
	files
		.filter(f => path.extname(f) === '.txt')
		.forEach(f => {
			const name = titleCase(path.parse(f).name);
			const src = path.join('examples', f);
			const output = src.replace('.txt', '.html');

			exec(
				`entwine --format dist/${pkg.name.toLowerCase()}-${
					pkg.version
				}/format.js --start Start ${src} --name "${name}" > ${output}`
			);
		});
});
