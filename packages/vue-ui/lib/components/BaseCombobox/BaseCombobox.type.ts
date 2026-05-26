import { type ComboboxRootEmits, type ComboboxRootProps } from '@ark-ui/vue/combobox';
import type { SelectItem, VirtualizationConfig } from '@components/type';
import type { CommonFieldProps } from '@components/BaseField';
import type { HTMLAttributes } from 'vue';

type ArkComboboxProps = ComboboxRootProps<SelectItem>;

export interface ComboboxBaseProps
	extends CommonFieldProps<string[]>,
		Pick<
			ArkComboboxProps,
			'loopFocus' | 'open' | 'multiple' | 'modelValue' | 'defaultValue' | 'defaultOpen'
		> {
	class?: string;

	/** The array of items (options) to be displayed in the combobox menu. Each item should have a label and a value. */
	items?: Array<SelectItem>;

	dataTestid?: string;

	/**
	 * Configuration for the virtualization engine.
	 * When this is provided, the component switches to `VirtualList` rendering for the options list,
	 * enabling high-performance scrolling for large datasets.
	 */
	virtualizationConfig?: VirtualizationConfig;

	/**
	 * The maximum height of the popup menu.
	 */
	popupMaxHeight?: number;
}

export type BaseComboboxProps = ComboboxBaseProps &
	/* @vue-ignore */
	Omit<HTMLAttributes, 'value' | 'disabled' | 'required' | 'size' | 'multiple'>;

export type BaseComboboxEmits = {
	focusOutside: ComboboxRootEmits<SelectItem>['focusOutside'];
	exitComplete: ComboboxRootEmits<SelectItem>['exitComplete'];
	valueChange: ComboboxRootEmits<SelectItem>['valueChange'];
	'update:modelValue': ComboboxRootEmits<SelectItem>['update:modelValue'];
	'update:open': ComboboxRootEmits<SelectItem>['update:open'];
	'update:inputValue': ComboboxRootEmits<SelectItem>['update:inputValue'];
};

export type BaseComboboxSlots = {
	/**
	 * Slot for customizing the input element or value display.
	 * Passes `supportingTextId` from the BaseField for accessibility.
	 */
	customValueText?(props: { supportingTextId: string }): void;

	/** Slot for a custom clear icon. */
	clearIcon?(): void;

	/** Slot for a custom trigger (chevron) icon. */
	triggerIcon?(): void;

	/** Slot for adding content at the top of the dropdown menu. */
	menuHeader?(): void;

	/**
	 * Slot for customizing individual items in the dropdown menu.
	 * Overrides the default highlighted text rendering.
	 */
	itemContent?(props: { item: SelectItem; itemIndex: number }): void;

	/** Slot for adding content when the combobox has no matching items. */
	emptyContent?(): void;

	/** Slot for adding content at the bottom of the dropdown menu. */
	menuFooter?(): void;
};
