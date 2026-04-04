import type {
	BaseComboboxEmits,
	BaseComboboxProps,
	BaseComboboxSlots
} from '@components/BaseCombobox';

export interface SingleComboboxProps
	extends Omit<BaseComboboxProps, 'modelValue' | 'defaultValue' | 'multiple'> {
	modelValue?: string;
	defaultValue?: string;
}

export interface SingleComboboxEmits {
	'update:modelValue': [value: string];
	valueChange: [details: { value: string }];
	'update:open': BaseComboboxEmits['update:open'];
	'update:inputValue': BaseComboboxEmits['update:inputValue'];
	focusOutside: BaseComboboxEmits['focusOutside'];
	exitComplete: BaseComboboxEmits['exitComplete'];
}

export type SingleComboboxSlots = BaseComboboxSlots & {
	[key: string]: unknown;
};
