import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

export default {
	input: 'src/index.js',
	output: {
		format: 'iife'
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
			plugins: ['external-helpers'],
			presets: [
				['env', {targets: {browsers: ['iOS > 9', 'IE 11', '>10%']}, modules: false}]
			]
		}),
		resolve({browser: true}),
		commonjs(),
		uglify()
	]
};