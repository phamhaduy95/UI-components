import baseLibConfig from '@configs/eslint-config/ui-library';
import { defineConfig } from 'eslint/config';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default defineConfig([
	...baseLibConfig,
	{
		files: ['**/*.vue'],
		plugins: {
			vue: eslintPluginVue
		},
		extends: [...eslintPluginVue.configs['flat/recommended']],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: globals.browser,
			parserOptions: {
				parser: typescriptEslint.parser
			}
		},
		rules: {
			'vue/html-indent': 'off',
			'vue/require-default-prop': 'off',
			'vue/prop-name-casing': [
				'warn',
				'camelCase',
				{
					ignoreProps: ['data-testid']
				}
			],
			'vue/html-self-closing': 'off'
		}
	}
]);
