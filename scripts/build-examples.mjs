// This script will only work when run by npm/yarn because it relies on entwine
// being available in the path.

import {execaCommand} from 'execa';
import fs from 'fs-extra';
import path from 'path';
import titleCase from 'title-case';
import pkg from '../package.json' assert { type: 'json' };

fs.readdir(path.resolve('examples')).then(files => {
	files
		.filter(f => path.extname(f) === '.txt')
		.forEach(f => {
			const name = titleCase(path.parse(f).name);
			const src = path.join('examples', f);
			const output = src.replace('.txt', '.html');

			execaCommand(
				`entwine --format dist/${pkg.name.toLowerCase()}-${
					pkg.version
				}/format.js --start Start ${src} --name "${name}" > ${output}`
			);
		});
});
