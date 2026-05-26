import type { HTMLAttributes, Component } from 'vue';

export type FieldStatus = 'success' | 'warning' | 'error';
export type FieldSize = 'xs' | 'sm' | 'md' | 'lg';

export interface CommonFieldProps<TValue> {
	label?: string;
	labelId?: string;
	status?: FieldStatus;
	required?: boolean;
	disabled?: boolean;
	clearable?: boolean;
	size?: FieldSize;
	supportingText?: string;
	supportingTextId?: string;
	placeholder?: string;
	modelValue?: TValue;
	defaultValue?: TValue;
	name?: string;
	readOnly?: boolean;
}

export interface BaseFieldProps extends /* @vue-ignore */ HTMLAttributes, CommonFieldProps<string> {
	labelElement?: string | Component;
	dataTestid?: string;
	inputId?: string;
}

interface LabelTextSlotProps {
	label?: string;
	isRequired: boolean;
	status?: FieldStatus;
}

interface LabelSlotProps {
	label?: string;
	isRequired?: boolean;
	status?: FieldStatus;
}

interface SupportingTextSlotProps {
	supportingText?: string;
	status?: FieldStatus;
	isRequired?: boolean;
}

export type BaseFieldSlots = {
	default?: () => void;
	label?: (props: LabelSlotProps) => void;
	labelText?: (props: LabelTextSlotProps) => void;
	supportingText?: (props: SupportingTextSlotProps) => void;
};
