import type { TextareaHTMLAttributes } from 'vue';
import type { CommonFieldProps } from '@components/BaseField';

export interface TextAreaProps
	extends CommonFieldProps<string>,
		/* @vue-ignore */ Omit<TextareaHTMLAttributes, 'disabled' | 'readonly' | 'required'> {
	dataTestid?: string;
	rows?: number;
}

export type TextAreaEmits = {
	'update:modelValue': [value: string];
	valueChange: [e: InputEvent];
};
