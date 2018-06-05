import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import string from 'rollup-plugin-string';
import uglify from 'rollup-plugin-uglify';

let config = {
	input: 'src/index.js',
	output: {
		format: 'iife',
		strict: false
	},
	plugins: [
		resolve({browser: true}),
		commonjs(),
		json(),
		string({include: '**/*.html'})
	]
};

if (process.env.NODE_ENV === 'production') {
	config.plugins.push(
		babel({
			exclude: 'node_modules/**',
			plugins: ['external-helpers'],
			presets: [
				[
					'env',
					{
						targets: {browsers: ['iOS > 9', 'IE 11', '>10%']},
						modules: false
					}
				]
			]
		})
	);

	config.plugins.push(uglify());
}

export default config;
