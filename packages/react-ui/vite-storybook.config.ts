/// <reference types="vitest/config" />
import path from 'path';
import { fileURLToPath } from 'url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'lib/components'),
			'@themes': path.resolve(__dirname, 'lib/themes'),
			'@stories': path.resolve(__dirname, 'stories')
		}
	}
});
