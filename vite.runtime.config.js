import {parseTwee} from 'extwee';
import {readdir, readFile} from 'fs/promises';
import {extname, resolve} from 'path';
import postcssUrl from 'postcss-url';
import {visualizer} from 'rollup-plugin-visualizer';
import serveStatic from 'serve-static';
import {defineConfig} from 'vite';
import checker from 'vite-plugin-checker';
import {createHtmlPlugin} from 'vite-plugin-html';
import {viteSingleFile} from 'vite-plugin-singlefile';

const isRelease = process.env.NODE_ENV === 'production';

/**
 * Assembles all Twee files under demo/ into a single story.
 */
async function demoStoryData() {
	let source = '';

	for (const filename of await readdir(resolve(__dirname, 'demo'))) {
		if (
			extname(filename) !== '.twee' ||
			filename === 'cloak-of-darkness.twee'
		) {
			// Skip Cloak of Darkness and related assets.
			continue;
		}

		source +=
			(await readFile(resolve(__dirname, 'demo', filename), 'utf8')) + '\n';
	}

	const story = parseTwee(source);

	story.name = 'Demo';
	story.start = 'Start';
	return story.toTwine2HTML();
}

/**
 * Serves files under demo/assets/ at /. This is used for examples that
 * reference external assets like sounds.
 */
const demoAssetPlugin = {
	name: 'chapbook-serve-demo-assets',
	configureServer(server) {
		server.middlewares.use(serveStatic('demo/assets/'));
	}
};

export default defineConfig(async () => ({
	build: {
		emptyOutDir: true,
		outDir: '../../build/'
	},
	css: {
		postcss: {
			// Inline SVGs as data URIs.
			plugins: [postcssUrl({optimizeSvgEncode: true, url: 'inline'})]
		}
	},
	plugins: [
		process.env.NODE_ENV !== 'production' && demoAssetPlugin,
		process.env.NODE_ENV !== 'production' &&
			checker({
				eslint: {lintCommand: 'eslint "./**/*.ts"'},
				overlay: {initialIsOpen: false},
				typescript: true
			}),
		createHtmlPlugin({
			inject: {
				data: {
					storyData: isRelease ? '{{STORY_DATA}}' : await demoStoryData()
				},
				ejsOptions: {
					root: 'src/runtime'
				}
			},
			minify: true
		}),
		process.env.NODE_ENV !== 'production' && visualizer(),
		viteSingleFile()
	],
	root: './src/runtime',
	server: {
		open: true
	}
}));
