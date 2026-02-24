import baseConfig from './base.js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	...baseConfig,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			globals: globals.browser
		}
	}
]);
