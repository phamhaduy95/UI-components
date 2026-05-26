import baseConfig from '@configs/eslint-config/prettier';

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
export default {
	...baseConfig,
	overrides: [
		{
			files: '*.vue',
			options: {
				singleAttributePerLine: true,
				vueIndentScriptAndStyle: true
			}
		}
	]
};
