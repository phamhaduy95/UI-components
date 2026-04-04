import type { NumberInputRootEmits } from '@ark-ui/vue/number-input';
import type { CommonFieldProps } from '@components/type';

export interface NumberInputProps extends CommonFieldProps<string> {
	modelValue?: string;
	max?: number;
	min?: number;
	formatOptions?: Intl.NumberFormatOptions;
	step?: number;
	inputMode?: 'decimal' | 'numeric';
	locale?: string;
	dataTestid?: string;
}

export type NumberInputEmits = NumberInputRootEmits;
