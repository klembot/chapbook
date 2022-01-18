import cpy from 'cpy';
import fs from 'fs-extra';
import pug from 'pug';
import pkg from '../package.json';

async function run() {
	await fs.mkdirp('docs');
	await fs.writeFile('docs/index.html', pug.renderFile('homepage/index.pug', pkg);
	await cpy('homepage/*{.css,.jpeg}', 'docs');
	await fs.mkdirp('docs/examples');
	await cpy('examples/cloak-of-darkness.*', 'docs/examples');
	await fs.mkdirp('docs/guide');
	await cpy('**', '../../docs/guide', {cwd: 'guide/book/', parents: true});
	await fs.mkdirp(`docs/use/${pkg.version}`);
	await cpy(`dist/chapbook-${pkg.version}`, `docs/use/${pkg.version}/`);
	await cpy(`dist/chapbook-${pkg.version}-micro`, `docs/use/${pkg.version}-micro/`);
	await cpy(`logo.svg`, `docs/use/${pkg.version}/`);
	await cpy(`logo.svg`, 'docs/');
	console.log('Wrote files to docs/.')
}

run();