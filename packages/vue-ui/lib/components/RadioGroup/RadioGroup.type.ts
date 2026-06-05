import type { CommonFieldProps } from '@components/BaseField';
import type { HTMLAttributes } from 'vue';
import { type RadioGroupRootEmits } from '@ark-ui/vue/radio-group';

export type RadioOption = {
	label: string;
	value: string;
	disabled?: boolean;
};

export interface RadioGroupProps
	extends Partial<Pick<CommonFieldProps<string>, 'status' | 'label' | 'supportingText'>>,
		/* @vue-ignore */ HTMLAttributes {
	options: RadioOption[];
	modelValue?: string;
	defaultValue?: string;
	disabled?: boolean;
	readonly?: boolean;
	required?: boolean;
	orientation?: 'horizontal' | 'vertical';
	size?: 'sm' | 'md' | 'lg';
	dataTestid?: string;
}

export type RadioGroupEmits = {
	'update:modelValue': [value: string];
	valueChange: RadioGroupRootEmits['valueChange'];
};

export type RadioGroupSlots = {
	label?: (props: { option: RadioOption }) => void;
};
