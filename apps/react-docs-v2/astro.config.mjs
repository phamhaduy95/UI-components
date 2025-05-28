// @ts-check
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import path from 'path';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	integrations: [react()],

	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				src: path.resolve(path.dirname('.'), './src'),
				'@styles': path.resolve(path.dirname('.'), './src/styles'),
				'@pages': path.resolve(path.dirname('.'), './src/pages'),
				'@component': path.resolve(path.dirname('.'), './src/components')
			}
		}
	}
});
