import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import * as glob from 'glob';
import path, { extname, relative } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

const components: Array<[string, string]> = glob
	.sync('lib/**/*.{ts,tsx}', {
		ignore: ['lib/**/*.d.ts', 'lib/**/type.ts']
	})
	.map((file) => [
		relative('lib', file.slice(0, file.length - extname(file).length)),
		fileURLToPath(new URL(file, import.meta.url))
	]);

const themes = glob
	.sync('lib/themes/**/*.css')
	.map((file) => [
		relative('lib/themes', file.slice(0, file.length - extname(file).length)),
		fileURLToPath(new URL(file, import.meta.url))
	]);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		libInjectCss(),
		dts({
			entryRoot: 'lib',
			tsconfigPath: './tsconfig.lib.json'
		})
	],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, './lib/components')
		}
	},
	build: {
		target: 'esnext',
		lib: {
			entry: Object.fromEntries([...components, ...themes])
		},
		sourcemap: true,
		rollupOptions: {
			external: ['react', 'react-dom', 'react/jsx-runtime'],
			output: [
				{
					format: 'cjs',
					chunkFileNames: 'common/[name].cjs',
					entryFileNames: '[name].cjs',
					assetFileNames: (a) => {
						if (a.originalFileNames.length > 0) {
							const targetDir = relative('lib', path.dirname(a.originalFileNames[0]));
							const fileName = path.join(targetDir, a.names[0]);
							return fileName;
						}
						return 'assets/[name][extname]';
					}
				},
				{
					format: 'es',
					assetFileNames: (a) => {
						if (a.originalFileNames.length > 0) {
							const targetDir = relative('lib', path.dirname(a.originalFileNames[0]));
							const fileName = path.join(targetDir, a.names[0]);
							return fileName;
						}
						return 'assets/[name][extname]';
					},
					entryFileNames: '[name].js',
					chunkFileNames: 'common/[name].js'
				}
			]
		},
		copyPublicDir: false
	}
});
