import type { Color } from '@ark-ui/vue/color-picker';
import type { ColorPickerColorFormat } from './ColorPicker.type';

export const generateColorStringValue = (value: Color, format: ColorPickerColorFormat): string => {
	const alpha = value.getChannelValue('alpha');

	switch (format) {
		case 'hex':
			return alpha === 1 ? value.toString('hex') : value.toString('hexa');
		case 'hsla':
			return alpha === 1 ? value.toString('hsl') : value.toString('hsla');
		case 'hsba':
			return alpha === 1 ? value.toString('hsb') : value.toString('hsba');
		case 'rgba':
			return alpha === 1 ? value.toString('rgb') : value.toString('rgba');
		default:
			throw new Error('Invalid color format');
	}
};
