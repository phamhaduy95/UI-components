import type { VirtualListProps } from './VirtualList/VirtualList.type';

export type FieldStatus = 'success' | 'warning' | 'error';

export type FieldSize = 'small' | 'medium' | 'large';

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

export interface VirtualizationConfig
	extends Pick<VirtualListProps<SelectItem>, 'estimateSize' | 'overscan' | 'getItemKey'> {
	onStartReached?: () => void;
	onEndReached?: () => void;
}
