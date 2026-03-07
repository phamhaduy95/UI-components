import { fileURLToPath } from 'node:url';
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'lib'),
			'@components': path.resolve(__dirname, 'lib/components'),
			'@stories': path.resolve(__dirname, 'stories')
		}
	}
});
