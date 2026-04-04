import type { HTMLAttributes } from 'vue';
import type { CommonFieldProps } from '@components/type';

export interface CheckboxProps
	extends Pick<CommonFieldProps<boolean>, 'status' | 'label' | 'supportingText'>,
		/* @vue-ignore */ HTMLAttributes {
	checked?: boolean;
	value?: string;
	disabled?: boolean;
	defaultChecked?: boolean;
	readonly?: boolean;
	indeterminate?: boolean;
	required?: boolean;
	size?: 'small' | 'medium';
	dataTestid?: string;
}

export type CheckboxEmit = {
	'update:checked': [value: boolean];
	checkedChange: [checked: boolean, value?: string];
};

export type CheckboxSlots = {
	default?: () => void;
};
