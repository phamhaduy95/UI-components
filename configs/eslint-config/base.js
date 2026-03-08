import js from '@eslint/js';
import { configs as tsConfig } from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{
		ignores: ['dist', 'node_modules', '.next', '.turbo', '.git', '.idea', '.vscode']
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		plugins: {
			js
		},
		extends: [js.configs.recommended]
	},
	...tsConfig.recommended,
	{
		rules: {
			'no-console': 'error',
			'no-debugger': 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_'
				}
			]
		}
	}
]);
