import type { HTMLAttributes } from 'vue';
import type { CommonFieldProps } from '@components/BaseField';

export interface TextInputProps extends CommonFieldProps<string>, /* @vue-ignore */ HTMLAttributes {
	dataTestid?: string;
}

export type TextInputEmits = {
	'update:modelValue': [value: string];
	valueChange: [e: InputEvent];
};
