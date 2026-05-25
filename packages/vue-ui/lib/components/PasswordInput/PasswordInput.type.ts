import type { CommonFieldProps } from '@components/BaseField';
import type { HTMLAttributes } from 'vue';

export interface PasswordInputProps
	extends CommonFieldProps<string>,
		/* @vue-ignore */ HTMLAttributes {
	modelValue?: string;
	autoComplete?: string;
	modelVisable?: boolean;
	defaultVisible?: boolean;
	dataTestid?: string;
}

export type PasswordInputEmits = {
	valueChange: [e: InputEvent];
	'update:modelValue': [value: string];
	'update:modelVisable': [visible: boolean];
};
