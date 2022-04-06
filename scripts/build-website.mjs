import cpy from 'cpy';
import fs from 'fs-extra';
import pug from 'pug';
import pkg from '../package.json';

// TODO use dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function writeHomepage() {
	await fs.writeFile(
		'docs/index.html',
		pug.renderFile('homepage/index.pug', pkg)
	);
	await cpy('homepage/*{.css,.jpeg}', 'docs');
	await cpy(`logo.svg`, 'docs');
}

async function writeExamples() {
	await fs.mkdirp('docs/examples');
	await cpy('examples/cloak-of-darkness.*', 'docs/examples');
}

async function writeGuide() {
	await fs.mkdirp('docs/guide');
	await cpy('**', '../../docs/guide', {cwd: 'guide/book/', parents: true});
}

async function writeFormats() {
	await fs.mkdirp(`docs/use/${pkg.version}`);
	await cpy(`dist/chapbook-${pkg.version}`, `docs/use/${pkg.version}/`);
	await cpy(
		`dist/chapbook-${pkg.version}-micro`,
		`docs/use/${pkg.version}-micro/`
	);
	await cpy(`logo.svg`, `docs/use/${pkg.version}/`);
}

async function run() {
	await fs.mkdirp('docs');
	await fs.emptyDir('docs');

	await Promise.all([
		writeHomepage(),
		writeExamples(),
		writeGuide(),
		writeFormats()
	]);

	console.log('Wrote files to docs/.');
}

run();