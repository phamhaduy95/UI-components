import type { StorybookConfig } from '@storybook/vue3-vite';

import { resolve } from 'path';

const config: StorybookConfig = {
	stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@chromatic-com/storybook',
		'@storybook/addon-a11y',
		'@storybook/addon-docs',
		'@storybook/addon-vitest'
	],
	framework: {
		name: '@storybook/vue3-vite',
		options: {
			builder: {
				viteConfigPath: resolve(import.meta.dirname, '../vite-storybook.config.ts')
			},
			docgen: {
				plugin: 'vue-component-meta',
				tsconfig: 'tsconfig.app.json'
			}
		}
	}
};
export default config;
