import type { DatePickerRootProps } from '@ark-ui/vue/date-picker';
import type { CommonFieldProps } from '@components/BaseField';
import type { HTMLAttributes } from 'vue';

export interface BaseDatePickerProps
	extends Pick<DatePickerRootProps, 'open' | 'min' | 'max' | 'placeholder' | 'readOnly'>,
		CommonFieldProps<Date | null> {
	modelValue?: Date | null;
	defaultValue?: Date;
	locale?: string;
	format?: string;
	id?: string;
	inputId?: string;
	dataTestid?: string;
}

export interface DatePickerProps extends BaseDatePickerProps, /*@vue-ignore */ HTMLAttributes {}

export type DatePickerEmits = {
	'update:modelValue': [date: Date | null];
	'update:open': [open: boolean];
	valueChange: [date: Date | null];
};

export type DatePickerSlots = {
	default?: () => void;
};
