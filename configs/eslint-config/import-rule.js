import { defineConfig } from 'eslint/config';
import { importX } from 'eslint-plugin-import-x';
import { parser as tsparser } from 'typescript-eslint';
import * as tsResolver from 'eslint-import-resolver-typescript';

export default defineConfig([
	{
		files: ['**/*.{ts,tsx}'],

		plugins: {
			'import-x': importX
		},
		extends: [importX.flatConfigs.recommended, importX.flatConfigs.typescript],
		languageOptions: {
			parser: tsparser,
			ecmaVersion: 'latest',
			sourceType: 'module'
		},
		settings: {
			'import-x/resolver': {
				name: 'tsResolver',
				resolver: tsResolver
			}
		},
		rules: {
			'import-x/no-empty-named-blocks': 'error',
			'import-x/no-relative-parent-imports': 'error',
			'import-x/no-unresolved': 'off',
			'import-x/order': [
				'error',
				{
					groups: ['builtin', 'external', 'internal', 'type', 'sibling', 'index', 'unknown'],

					pathGroups: [
						{
							pattern: '@components/**',
							group: 'internal',
							position: 'after'
						},
						{
							pattern: '@stories/**',
							group: 'internal',
							position: 'after'
						},

						{
							pattern: '@packages/styles/**',
							group: 'unknown',
							position: 'after'
						}
					],

					pathGroupsExcludedImportTypes: ['builtin'],
					'newlines-between': 'always-and-inside-groups',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true
					},
					warnOnUnassignedImports: true,
					named: true
				}
			]
		}
	}
]);
