import type { DatePickerRootProps } from '@ark-ui/vue/date-picker';
import type { CommonFieldProps } from '@components/BaseField';
import type { HTMLAttributes } from 'vue';

export interface BaseDateRangePickerProps
	extends Pick<DatePickerRootProps, 'open' | 'min' | 'max' | 'placeholder' | 'readOnly'>,
		CommonFieldProps<Date[]> {
	modelValue?: Date[];
	defaultValue?: Date[];
	locale?: string;
	format?: string;
	id?: string;
	inputId?: string;
	dataTestid?: string;
}

export interface DateRangePickerProps
	extends BaseDateRangePickerProps,
		/*@vue-ignore */ HTMLAttributes {}

export type DateRangePickerEmits = {
	'update:modelValue': [value: Date[]];
	'update:open': [open: boolean];
	valueChange: [value: Date[]];
};

export type DateRangePickerSlots = {
	clearIcon?: () => void;
	triggerIcon?: () => void;
};
