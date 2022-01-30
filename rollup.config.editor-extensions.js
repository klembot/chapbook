import 'dotenv/config';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import image from '@rollup/plugin-image';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import pug from 'pug';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import {terser} from 'rollup-plugin-terser';

const isRelease = process.env.NODE_ENV === 'production';

// We use ___format as a placeholder for the `this` that the IIFE we bundle will
// be bound to. See src/editor-extensions/hydrate.js for where this is done.

const config = {
	external: ['___format'],
	input: isRelease
		? 'src/editor-extensions/hydrate.js'
		: 'src/editor-extensions/dev.js',
	output: {
		file: `dist/editor-extensions/index.js`,
		format: 'iife',
		globals: {
			___format: 'this'
		},
		sourcemap: false
	},
	plugins: [
		commonjs(),
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules/**',
			presets: [['@babel/env', {modules: false}]]
		}),
		image(),
		nodePolyfills(),
		nodeResolve({extensions: ['.js', '.svg']}),
		replace({
			preventAssignment: true,
			values: {
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		})
	]
};

if (isRelease) {
	config.plugins.push(terser());
} else {
	config.plugins.push(postcss());
	config.plugins.push(
		html({template: pug.compileFile('src/editor-extensions/dev.pug')})
	);
	config.plugins.push(
		serve({contentBase: 'dist/editor-extensions', open: true, port: 8080})
	);
}

module.exports = config;