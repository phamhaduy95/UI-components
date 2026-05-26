import { fileURLToPath, URL } from 'node:url';

import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { globbySync } from 'globby';
import { extname, relative } from 'path';

const componentEntries: Array<[string, string]> = globbySync(['lib/**/*.vue', 'lib/**/index.ts'], {
	ignore: ['lib/**/*.d.ts', 'lib/**/type.ts']
}).map((file) => {
	const name = extname(file) === '.vue' ? file : file.slice(0, file.length - extname(file).length);
	return [relative('lib', name), fileURLToPath(new URL(file, import.meta.url))];
});

export default defineConfig({
	plugins: [vue(), libInjectCss()],
	css: {
		transformer: 'lightningcss'
	},
	resolve: {
		alias: {
			'@components': fileURLToPath(new URL('./lib/components', import.meta.url))
		}
	},
	build: {
		target: 'esnext',
		lib: {
			entry: Object.fromEntries(componentEntries)
		},
		rollupOptions: {
			external: ['vue'],
			output: [
				{
					format: 'es',
					entryFileNames: '[name].js',
					exports: 'named',
					chunkFileNames: 'common/[name].js',
					assetFileNames: 'styles/[name].css'
				},
				{
					format: 'cjs',
					exports: 'named',
					entryFileNames: '[name].cjs',
					chunkFileNames: 'common/[name].cjs',
					assetFileNames: 'styles/[name].css'
				}
			]
		},
		copyPublicDir: false
	}
});
