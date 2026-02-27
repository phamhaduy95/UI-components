import baseConfig from './base.js';

import { defineConfig } from 'eslint/config';
import astro from 'eslint-plugin-astro';
import typescriptEslint from 'typescript-eslint';

export default defineConfig([
	...baseConfig,
	{
		ignores: ['.astro']
	},
	{
		files: ['**/*.{astro}'],
		plugins: {
			astro
		},
		languageOptions: {
			parserOptions: {
				parser: typescriptEslint.parser
			}
		},

		extends: [...astro.configs.recommended]
	}
]);
