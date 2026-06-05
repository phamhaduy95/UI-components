import type { HTMLAttributes } from 'vue';
import type { CommonFieldProps } from '@components/BaseField';

export interface CheckboxProps
	extends Partial<Pick<CommonFieldProps<string>, 'status' | 'label' | 'supportingText'>>,
		/* @vue-ignore */ HTMLAttributes {
	checked?: boolean;
	value?: string;
	disabled?: boolean;
	defaultChecked?: boolean;
	readonly?: boolean;
	indeterminate?: boolean;
	required?: boolean;
	size?: 'sm' | 'md' | 'lg';
	dataTestid?: string;
}

export type CheckboxEmits = {
	'update:checked': [value: boolean];
	checkedChange: [checked: boolean, value?: string];
};

export type CheckboxSlots = {
	default?: () => void;
};
