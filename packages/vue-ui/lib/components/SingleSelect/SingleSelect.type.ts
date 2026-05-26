import type {
	BaseSelectEmits,
	BaseSelectSlots,
	SelectBaseProps
} from '@components/BaseSelect/BaseSelect.type';
import type { SelectItem } from '@components/type';
import type { CommonFieldProps } from '@components/BaseField';
import type { SelectHTMLAttributes } from 'vue';

export interface SingleSelectBaseProps
	extends CommonFieldProps<string>,
		Omit<SelectBaseProps, 'modelValue' | 'defaultValue'> {
	dataTestid?: string;
	modelValue?: string;
	defaultValue?: string;
}

export type SingleSelectProps = SingleSelectBaseProps &
	// @vue-ignore
	Omit<SelectHTMLAttributes, keyof SingleSelectBaseProps>;

export interface SingleSelectEmits {
	valueChange: [details: { value: string; item?: SelectItem }];
	'update:modelValue': [value: string];
	'update:open': BaseSelectEmits['update:open'];
	focusOutside: BaseSelectEmits['focusOutside'];
	exitComplete: BaseSelectEmits['exitComplete'];
}

export type SingleSelectSlots = BaseSelectSlots & {
	[key: string]: unknown;
};
