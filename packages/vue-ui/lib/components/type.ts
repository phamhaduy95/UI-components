import type { VirtualListProps } from './VirtualList';

export type FieldStatus = 'success' | 'warning' | 'error';
export type FieldSize = 'small' | 'medium';

export type SelectItem = { value: string; label: string; disabled?: boolean };

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

export interface VirtualizationConfig
	extends Pick<VirtualListProps<SelectItem>, 'estimateSize' | 'overscan' | 'getItemKey'> {
	onStartReached?: () => void;
	onEndReached?: () => void;
}
