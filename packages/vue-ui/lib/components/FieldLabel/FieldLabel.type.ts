import type { FieldStatus } from '@components/BaseField';
import type { Component, LabelHTMLAttributes } from 'vue';

export interface FieldLabelProps extends /* @vue-ignore */ LabelHTMLAttributes {
	type?: string | Component;
	status?: FieldStatus;
	required?: boolean;
	showLabel?: boolean;
}

export type FieldLabelSlots = {
	default?: () => void;
};
