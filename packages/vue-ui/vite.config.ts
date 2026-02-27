import { fileURLToPath, URL } from 'node:url';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { globbySync } from 'globby';

export default defineConfig({
	plugins: [
		vue(),
		libInjectCss(),
		dts({
			entryRoot: 'lib',
			staticImport: true,
			tsconfigPath: './tsconfig.lib.json'
		})
	],
	resolve: {
		alias: {
			'@components': fileURLToPath(new URL('./lib/components', import.meta.url))
		}
	},
	build: {
		target: 'esnext',
		lib: {
			entry: globbySync(['lib/**/index.ts'])
		},
		minify: true,

		rollupOptions: {
			external: ['vue'],
			output: [
				{
					format: 'es',
					entryFileNames: '[name].js',
					preserveModules: true,
					exports: 'named',
					preserveModulesRoot: 'lib'
				},
				{
					format: 'cjs',
					preserveModules: true,
					preserveModulesRoot: 'lib',
					exports: 'named',
					entryFileNames: '[name].cjs'
				}
			]
		},
		copyPublicDir: false
	}
});
