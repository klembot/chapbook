import 'dotenv/config';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import cssnano from 'cssnano';
import html from '@rollup/plugin-html';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import pug from 'pug';
import {readFileSync} from 'fs';
import replace from '@rollup/plugin-replace';
import {resolve} from 'path';
import serve from 'rollup-plugin-serve';
import {terser} from 'rollup-plugin-terser';
import TwineStory from 'twine-utils/story';

const isRelease = process.env.NODE_ENV === 'production';
const isMicro = process.env.CHAPBOOK_MICRO === 'y';

const htmlTemplate = pug.compileFile('src/runtime/index.pug');
const example = process.env.EXAMPLE || 'hello-world';
const story = new TwineStory();

story.mergeTwee(
	readFileSync(resolve(__dirname, `./examples/${example}.txt`), 'utf8')
);

story.attributes.name = example;
story.setStartByName('Start');

const babelPresets = ['preact'];
const postcssPlugins = [postcssImport];

if (isRelease) {
	babelPresets.push(['@babel/env', {modules: false}]);
	postcssPlugins.push(cssnano);
}

const config = {
	input: 'src/runtime/index.js',
	output: {
		file: `dist/${isMicro ? 'micro' : 'full'}/index.js`,
		format: 'iife',
		sourcemap: !isRelease
	},
	plugins: [
		commonjs(),
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules/**',
			presets: babelPresets
		}),
		json(),
		nodePolyfills(),
		nodeResolve({extensions: ['.js', '.jsx']}),
		postcss({extract: 'index.css', plugins: postcssPlugins}),
		replace({
			preventAssignment: true,
			values: {
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),
		html({
			template(rollup) {
				return htmlTemplate({
					rollup,
					inlineAssets: isRelease,
					storyData: isRelease ? '{{STORY_DATA}}' : story.toHtml()
				});
			}
		})
	]
};

if (isRelease) {
	if (isMicro) {
		config.external = ['./backstage'];
	}

	config.plugins.push(terser());
} else {
	config.plugins.push(
		serve({contentBase: 'dist/full', open: true, port: 8080})
	);
}

module.exports = config;
