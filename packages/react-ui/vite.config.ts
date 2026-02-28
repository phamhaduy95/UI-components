import react from '@vitejs/plugin-react-swc';
import path, { extname, relative } from 'path';
import { globbySync } from 'globby';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { fileURLToPath } from 'url';

const components: Array<[string, string]> = globbySync('lib/**/*.{ts,tsx}', {
	ignore: ['lib/**/*.d.ts', 'lib/**/type.ts']
}).map((file) => [
	relative('lib', file.slice(0, file.length - extname(file).length)),
	fileURLToPath(new URL(file, import.meta.url))
]);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		libInjectCss(),
		dts({
			entryRoot: 'lib',
			staticImport: true,
			tsconfigPath: './tsconfig.lib.json'
		})
	],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, './lib/components')
		}
	},
	css: {
		transformer: 'lightningcss'
	},
	build: {
		target: 'esnext',
		lib: {
			entry: Object.fromEntries(components)
		},
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
					chunkFileNames: 'common/[name].js',
					entryFileNames: '[name].js',
					assetFileNames: (a) => {
						if (a.originalFileNames.length > 0) {
							const targetDir = relative('lib', path.dirname(a.originalFileNames[0]));
							const fileName = path.join(targetDir, a.names[0]);
							return fileName;
						}
						return 'assets/[name][extname]';
					}
				}
			]
		},
		copyPublicDir: false
	}
});
