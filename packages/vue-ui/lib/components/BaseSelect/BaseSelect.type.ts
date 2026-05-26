import { type SelectRootEmits, type SelectRootProps } from '@ark-ui/vue/select';
import type { SelectItem, VirtualizationConfig } from '@components/type';
import type { CommonFieldProps } from '@components/BaseField';

import type { SelectHTMLAttributes } from 'vue';

type ArkSelectProps = SelectRootProps<SelectItem>;

export interface SelectBaseProps
	extends CommonFieldProps<string[]>,
		Pick<
			ArkSelectProps,
			| 'loopFocus'
			| 'open'
			| 'defaultOpen'
			| 'multiple'
			| 'deselectable'
			| 'lazyMount'
			| 'unmountOnExit'
			| 'modelValue'
			| 'defaultValue'
			| 'name'
		> {
	class?: string;

	/** The array of items (options) to be displayed in the select menu. Each item should have a label and a value. */
	items?: Array<SelectItem>;

	/** Unique identifier used for automation testing (e.g., data-testid attribute). */
	dataTestid?: string;

	/**
	 * Configuration for the virtualization engine.
	 * When this is provided, the component switches to `VirtualList` rendering for the options list,
	 * enabling high-performance scrolling for large datasets.
	 */
	virtualizationConfig?: VirtualizationConfig;

	/** The maximum height of the popup menu. */
	popupMaxHeight?: number;
}

export type BaseSelectProps = SelectBaseProps &
	/* @vue-ignore */ Omit<
		SelectHTMLAttributes,
		'value' | 'disabled' | 'required' | 'size' | 'name' | 'multiple'
	>;

export interface BaseSelectEmits {
	'update:modelValue': SelectRootEmits<SelectItem>['update:modelValue'];
	'update:open': SelectRootEmits<SelectItem>['update:open'];
	focusOutside: SelectRootEmits<SelectItem>['focusOutside'];
	exitComplete: SelectRootEmits<SelectItem>['exitComplete'];
	valueChange: SelectRootEmits<SelectItem>['valueChange'];
}

/**
 * Interface defining the slots available for the BaseSelect component.
 */
export interface BaseSelectSlots {
	/**
	 * Customizes the display of the selected value in the trigger.
	 * @param props Slot properties.
	 * @param props.supportingTextId Theoretical current field supporting text ID.
	 */
	customValueText?(props: { supportingTextId: string }): void;

	/**
	 * Customizes the clear icon displayed when `clearable` is enabled.
	 */
	clearIcon?(): void;

	/**
	 * Customizes the dropdown trigger icon.
	 */
	triggerIcon?(): void;

	/**
	 * Content to be displayed at the top of the dropdown menu popup.
	 */
	menuHeader?(): void;

	/**
	 * Content to be displayed at the bottom of the dropdown menu popup.
	 */
	menuFooter?(): void;

	/**
	 * Content to be displayed when there are no items to show.
	 */
	emptyContent?(): void;

	/**
	 * Customizes the rendering of each item within the list.
	 * @param props Slot properties.
	 * @param props.item The data object representing the current item.
	 * @param props.itemIndex The index of the item within the list.
	 */
	itemContent?(props: {
		item: SelectItem;
		itemIndex: number;
		isSelected: boolean;
		isDisabled: boolean;
		isHighlighted: boolean;
	}): void;
}
