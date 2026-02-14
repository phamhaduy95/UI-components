export type FieldStatus = 'success' | 'warning' | 'error';

type FieldSize = 'small' | 'medium' | 'large';

export type ItemObject = { value: string; label: string; disabled?: boolean };

export type SelectItem = { value: string; label: string; disabled?: boolean };

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
	value?: TValue;
	defaultValue?: TValue;
	name?: string;
	readOnly?: boolean;
}
