import type { FieldSize } from '@components/BaseField';
import type { HTMLAttributes } from 'vue';

export interface SwitchProps extends /* @vue-ignore */ HTMLAttributes {
	size?: FieldSize;
	supportingText?: string;
	disabled?: boolean;
	name?: string;
	label?: string;
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
