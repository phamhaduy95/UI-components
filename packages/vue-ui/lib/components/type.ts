export type FieldStatus = 'success' | 'warning' | 'error';
export type FieldSize = 'small' | 'medium' | 'large';

export interface CommonFieldProps<TValue> {
	label?: string;
	labelId?: string;
	status?: FieldStatus;
	required?: boolean;
	inputId?: string;
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
