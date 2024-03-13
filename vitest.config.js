import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {include: ['src/**'], provider: 'v8'},
		environment: 'jsdom',
		include: ['src/**/*.test.ts'],
		setupFiles: ['src/setup-tests.ts']
	}
});
