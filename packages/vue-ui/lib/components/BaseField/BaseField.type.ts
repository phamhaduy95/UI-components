import type { HTMLAttributes, Component } from 'vue';
import type { CommonFieldProps } from '@components/type';

export interface BaseFieldProps extends /* @vue-ignore */ HTMLAttributes, CommonFieldProps<string> {
	labelElement?: string | Component;
	dataTestid?: string;
	inputId?: string;
}

export type BaseFieldSlots = {
	default?: () => void;
};
