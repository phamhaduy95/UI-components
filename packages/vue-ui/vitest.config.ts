import { defineConfig, mergeConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

import viteStorybookConfig from './vite-storybook.config';

export default mergeConfig(
	viteStorybookConfig,
	defineConfig({
		test: {
			coverage: {
				provider: 'v8',
				clean: true,
				reporter: ['html', 'text', 'lcov'],
				include: ['lib/**/*.{ts,vue}'],
				exclude: ['**/index.ts', '**/*.type.ts', '**/type.ts'],
				thresholds: {
					global: {
						lines: 80,
						functions: 80,
						branches: 80,
						statements: 80
					}
				}
			},
			pool: 'threads',
			projects: [
				{
					extends: true,
					plugins: [
						storybookTest({
							configDir: path.join(dirname, '.storybook')
						})
					],
					test: {
						name: 'storybook',
						browser: {
							enabled: true,
							provider: playwright({}),
							headless: true,
							instances: [{ browser: 'chromium' }]
						},
						setupFiles: ['./.storybook/vitest.setup.ts']
					}
				}
			]
		}
	})
);
