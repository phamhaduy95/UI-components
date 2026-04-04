import type {
	BaseComboboxEmits,
	BaseComboboxProps,
	BaseComboboxSlots
} from '@components/BaseCombobox';

export interface MultipleComboboxProps
	extends Omit<BaseComboboxProps, 'modelValue' | 'defaultValue' | 'multiple'> {
	modelValue?: string[];
	defaultValue?: string[];
	placeholder?: string;
}

export type MultipleComboboxEmits = BaseComboboxEmits;

export type MultipleComboboxSlots = Omit<BaseComboboxSlots, 'customValueText'> & {
	[key: string]: unknown;
};
