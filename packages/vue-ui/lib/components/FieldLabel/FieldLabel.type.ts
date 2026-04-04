import type { Component, LabelHTMLAttributes } from 'vue';
import type { FieldStatus } from '@components/type';

export interface FieldLabelProps extends /* @vue-ignore */ LabelHTMLAttributes {
	type?: string | Component;
	status?: FieldStatus;
	required?: boolean;
	showLabel?: boolean;
}

export type FieldLabelSlots = {
	default?: () => void;
};
