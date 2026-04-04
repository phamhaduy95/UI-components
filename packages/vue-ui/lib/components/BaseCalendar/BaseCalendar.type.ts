import type { DatePickerRootEmits, DatePickerRootProps } from '@ark-ui/vue/date-picker';

export interface BaseCalendarProps
	extends Pick<
		DatePickerRootProps,
		| 'view'
		| 'startOfWeek'
		| 'selectionMode'
		| 'timeZone'
		| 'view'
		| 'minView'
		| 'maxView'
		| 'defaultView'
	> {
	modelValue?: Date[];
	defaultValue?: Date[];
	min?: Date;
	max?: Date;
	dataTestid?: string;
}

export type BaseCalendarEmits = {
	valueChange: [value: Date[]];
	'update:modelValue': [value: Date[]];
	'update:view': DatePickerRootEmits['update:view'];
};
