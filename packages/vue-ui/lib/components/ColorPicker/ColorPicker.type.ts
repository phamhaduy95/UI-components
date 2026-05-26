import type { HTMLAttributes } from 'vue';
import type { CommonFieldProps } from '@components/BaseField';
import type {
	ColorPickerRootEmits,
	ColorPickerColorFormat as ArkColorFormat,
	ColorPickerRootBaseProps,
	Color
} from '@ark-ui/vue/color-picker';
export type ColorValue = Pick<Color, 'toString' | 'isEqual'>;

import type { PositioningOptions } from '@zag-js/popper';

export type ColorPickerColorFormat = ArkColorFormat | 'hex';

export interface BaseColorPickerProps
	extends CommonFieldProps<string>,
		Pick<
			ColorPickerRootBaseProps,
			'closeOnSelect' | 'lazyMount' | 'unmountOnExit' | 'openAutoFocus' | 'open' | 'defaultOpen'
		> {
	modelValue?: string;
	defaultValue?: string;
	defaultFormat?: ColorPickerColorFormat;
	format?: ColorPickerColorFormat;
	positioning?: PositioningOptions;
	dataTestid?: string;
}

export type ColorPickerProps = BaseColorPickerProps & /*@vue-ignore */ HTMLAttributes;

export type ColorPickerEmits = {
	'update:modelValue': [value: string];
	'update:open': ColorPickerRootEmits['update:open'];
	'update:format': [format: ColorPickerColorFormat];
	'value-change-end': [value: string, colorValue: ColorValue];
	'value-change': [value: string, colorValue: ColorValue];
};
