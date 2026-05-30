import type { CommonFieldProps } from '@components/BaseField';

type NumberValue = number | null;
export interface NumberInputProps extends CommonFieldProps<NumberValue> {
	modelValue?: NumberValue;
	max?: number;
	min?: number;
	formatOptions?: Intl.NumberFormatOptions;
	step?: number;
	inputMode?: 'decimal' | 'numeric';
	locale?: string;
	dataTestid?: string;
}

export type NumberInputEmits = {
	'update:modelValue': [value: NumberValue];
	valueChange: [value: NumberValue, valueAsString: string];
	focusChange: [focused: boolean, valueAsNumber: number];
};
