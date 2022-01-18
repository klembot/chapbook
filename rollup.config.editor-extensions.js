import 'dotenv/config';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import {terser} from 'rollup-plugin-terser';

// We use ___format as a placeholder for the `this` that the IIFE we bundle will
// be bound to. See src/editor-extensions/hydrate.js for where this is done.

module.exports = {
	external: ['___format'],
	input: 'src/editor-extensions/hydrate.js',
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
		nodePolyfills(),
		nodeResolve({extensions: ['.js', '.jsx']}),
		replace({
			preventAssignment: true,
			values: {
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),
		terser()
	]
};
