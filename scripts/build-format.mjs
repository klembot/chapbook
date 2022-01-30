import cpy from 'cpy';
import {execa} from 'execa';
import fs from 'fs-extra';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function stringSize(value) {
	return Math.round(Buffer.byteLength(value, 'utf8') / 1024);
}

async function rimraf(path) {
	await fs.emptyDir(path);
	await fs.rmdir(path);
}

async function compileRollup(configName, env) {
	try {
		await execa('rollup', ['--config', `rollup.config.${configName}.js`], {
			env: {NODE_ENV: 'production', ...env},
			preferLocal: true
		});
	} catch (err) {
		console.error(`Compilation failed: ${err.message}`);
		process.exit(1);
	}
}

const pkg = JSON.parse(
	fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
);

function bindFormat({hydrateSource, isMicro, source}) {
	const props = {
		source,
		author: pkg.author.replace(/ <.*>/, ''),
		description: pkg.version,
		hydrate: hydrateSource,
		image: 'logo.svg',
		name: pkg.name,
		proofing: false,
		url: pkg.repository,
		version: pkg.version
	};

	if (isMicro) {
		props.description +=
			' This variant contains no testing-related code, and as a result, loads faster for players.';
		props.name += ' µ';
	}

	return `window.storyFormat(${JSON.stringify(props)})`;
}

async function run() {
	console.log('Bundling...');
	await Promise.all([
		compileRollup('runtime').then(() => console.log('Bundled main runtime.')),
		compileRollup('runtime', {CHAPBOOK_MICRO: 'y'}).then(() =>
			console.log('Bundled micro runtime.')
		),
		compileRollup('editor-extensions').then(() =>
			console.log('Bundled editor extensions.')
		)
	]);

	const mainRuntimeSource = await fs.readFile(
		path.resolve(__dirname, '../dist/full/index.html'),
		'utf8'
	);
	const microRuntimeSource = await fs.readFile(
		path.resolve(__dirname, '../dist/micro/index.html'),
		'utf8'
	);
	const hydrateSource = await fs.readFile(
		path.resolve(__dirname, '../dist/editor-extensions/index.js'),
		'utf8'
	);
	const formatPath = `${pkg.name.toLowerCase()}-${pkg.version}`;

	console.log(`Main runtime is ${stringSize(mainRuntimeSource)}K in size.`);
	console.log(`Micro runtime is ${stringSize(microRuntimeSource)}K in size.`);
	console.log('Writing format files...');

	await Promise.all([
		(async () => {
			await fs.mkdirp(path.resolve(__dirname, `../dist/${formatPath}`));
			await fs.writeFile(
				path.resolve(__dirname, `../dist/${formatPath}/format.js`),
				bindFormat({hydrateSource, source: mainRuntimeSource}),
				'utf8'
			);
			console.log(`Wrote dist/${formatPath}/format.js.`);
			await cpy(
				path.resolve(__dirname, '../src/logo.svg'),
				path.resolve(__dirname, `../dist/${formatPath}`)
			);
			console.log(`Copied src/logo.svg to dist/${formatPath}/logo.svg.`);
		})(),
		(async () => {
			await fs.mkdirp(path.resolve(__dirname, `../dist/${formatPath}-micro`));
			await fs.writeFile(
				path.resolve(__dirname, `../dist/${formatPath}-micro/format.js`),
				bindFormat({hydrateSource, source: microRuntimeSource}),
				'utf8'
			);
			console.log(`Wrote dist/${formatPath}-micro/format.js.`);
			await cpy(
				path.resolve(__dirname, '../src/logo.svg'),
				path.resolve(__dirname, `../dist/${formatPath}-micro`)
			);
			console.log(`Copied src/logo.svg to dist/${formatPath}-micro/logo.svg.`);
		})()
	]);

	console.log('Cleaning up...');

	await Promise.all([
		rimraf(path.resolve(__dirname, '../dist/editor-extensions')),
		rimraf(path.resolve(__dirname, '../dist/full')),
		rimraf(path.resolve(__dirname, '../dist/micro'))
	]);

	console.log('Done.');
}

run();
