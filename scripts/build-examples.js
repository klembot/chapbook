/*
This script will only work when run by npm/yarn because it relies on entwine
being available in the path.
*/

const pify = require('pify');
const exec = require('child-process-promise').exec;
const path = require('path');
const fs = pify(require('fs'));
const titleCase = require('title-case');
const pkg = require('../package.json');

fs.readdir(path.resolve('examples')).then(files => {
	files.filter(f => path.extname(f) === '.txt').forEach(f => {
		const name = titleCase(path.parse(f).name);
		const src = path.join('examples', f);
		const output = src.replace('.txt', '.html');

		console.log(path.basename(f));

		exec(`entwine --format dist/${pkg.name.toLowerCase()}-${pkg.version}/format.js --start Start ${src} --name "${name}" > ${output}`);
	});
});