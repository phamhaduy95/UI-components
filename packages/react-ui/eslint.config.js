import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import libConfig from '@configs/eslint-config/ui-library';

import { defineConfig } from 'eslint/config';
/** @type {import("eslint").Linter.Config[]} */
export default defineConfig([
	...libConfig,
	{
		files: ['**/*.{ts,tsx}'],
		basePath: 'lib',
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
		}
	}
]);
