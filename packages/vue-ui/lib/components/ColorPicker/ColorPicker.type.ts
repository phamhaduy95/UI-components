import type { ColorPickerRootEmits, ColorPickerColorFormat, Color } from '@ark-ui/vue/color-picker';
import type { CommonFieldProps } from '../type';

export interface ColorPickerProps extends CommonFieldProps<Color> {
	modelValue?: Color;
	defaultValue?: Color;
	defaultFormat?: ColorPickerColorFormat;
	format?: ColorPickerColorFormat;
	disabled?: boolean;
	required?: boolean;
	readOnly?: boolean;
	closeOnSelect?: boolean;
	open?: boolean;
	defaultOpen?: boolean;
	openAutoFocus?: boolean;
	dataTestid?: string;
}

export type ColorPickerEmits = ColorPickerRootEmits;
