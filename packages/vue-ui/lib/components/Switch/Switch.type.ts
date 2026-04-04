import type { CommonFieldProps } from '@components/type';
import type { HTMLAttributes } from 'vue';

export interface SwitchProps
	extends Pick<
			CommonFieldProps<boolean>,
			'size' | 'supportingText' | 'disabled' | 'name' | 'label'
		>,
		/* @vue-ignore */ HTMLAttributes {
	value?: string;
	color?: 'primary' | 'success' | 'error' | 'warning' | 'secondary';
	checked?: boolean;
	defaultChecked?: boolean;
	dataTestid?: string;
}

export type SwitchEmits = {
	'update:checked': [value: boolean];
	checkedChange: [payload: { checked: boolean; value?: string }];
};
