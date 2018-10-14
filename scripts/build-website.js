const pify = require('pify');
const cpy = require('cpy');
const fs = pify(require('fs'));
const makeDir = require('make-dir');
const pug = require('pug');

const pkg = require('../package.json');

const encoding = {encoding: 'utf8'};

makeDir('docs')
	.then(() =>
		fs.writeFile(
			'docs/index.html',
			pug.renderFile('homepage/index.pug', pkg)
		)
	)
	.then(() => cpy('homepage/*{.css,.jpeg}', 'docs'))
	.then(() => makeDir('docs/examples'))
	.then(() => cpy('examples/cloak-of-darkness.*', 'docs/examples'))
	.then(() => makeDir('docs/guide'))
	.then(() =>
		cpy('**', '../../docs/guide', {cwd: 'guide/_book/', parents: true})
	)
	.then(() => makeDir(`docs/use/${pkg.version}`))
	.then(() =>
		cpy(
			`dist/chapbook-${pkg.version}/format.js`,
			`docs/use/${pkg.version}/`
		)
	)
	.then(() => console.log('Wrote files to docs/.'));
