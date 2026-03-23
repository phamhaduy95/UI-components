import { Combobox as ArkCombobox } from '@ark-ui/react/combobox';
import * as React from 'react';
import { ComponentPropsWithRef, Ref } from 'react';

import { CommonFieldProps, SelectItem, VirtualizationConfig } from '@components/type';

export interface BaseComboboxProps
	extends Omit<ComponentPropsWithRef<'input'>, 'defaultValue' | 'size' | 'value' | 'ref'>,
		CommonFieldProps<string[]> {
	/** Whether the combobox is open. */
	open?: boolean;

	/** The default open state. */
	defaultOpen?: boolean;

	/** The array of items (options) to be displayed in the combobox menu. Each item should have a label and a value. */
	items?: Array<SelectItem>;

	/** Ref to the outer container element. */
	ref?: Ref<HTMLDivElement>;

	/** Ref to the input element. */
	inputRef?: Ref<HTMLInputElement>;

	/** Whether elements can be deselected. */
	deselectable?: boolean;

	/** Whether to loop through items when navigating with the keyboard. */
	loopFocus?: boolean;

	/** The name of the combobox field. */
	name?: string;

	/** Whether multiple items can be selected. */
	multiple?: boolean;

	/**
	 * Customizes the display of the selected value in the trigger.
	 * Can be a React node or a function receiving the supportingTextId.
	 */
	CustomValueText?: React.ReactNode | ((props: { supportingTextId: string }) => React.ReactNode);

	/** Callback fired when the selected value changes. */
	onValueChange?: ArkCombobox.RootProps<SelectItem>['onValueChange'];

	/** Callback fired when the open state changes. */
	onOpenChange?: ArkCombobox.RootProps<SelectItem>['onOpenChange'];

	/** Callback fired when the focus moves outside the component. */
	onFocusOutside?: ArkCombobox.RootProps<SelectItem>['onFocusOutside'];

	/** Callback fired when the exit animation is complete. */
	onExitComplete?: ArkCombobox.RootProps<SelectItem>['onExitComplete'];

	/** Unique identifier used for automation testing (e.g., data-testid attribute). */
	'data-testid'?: string;

	/**
	 * Configuration for the virtualization engine.
	 * When this is provided, the component switches to `VirtualList` rendering for the options list,
	 * enabling high-performance scrolling for large datasets.
	 */
	virtualizationConfig?: VirtualizationConfig;

	/** The maximum height of the popup menu. */
	popupMaxHeight?: number;

	/** Content to be displayed at the top of the dropdown menu popup. */
	menuHeader?: React.ReactNode;

	/** Content to be displayed at the bottom of the dropdown menu popup. */
	menuFooter?: React.ReactNode;

	/** Content to be displayed when there are no items to show. */
	emptyContent?: React.ReactNode;

	/**
	 * Customizes the rendering of each item within the list.
	 * @param props Render properties including item data and state (isSelected, isDisabled, isHighlighted).
	 */
	itemContent?: (props: {
		item: SelectItem;
		itemIndex: number;
		isSelected: boolean;
		isDisabled: boolean;
		isHighlighted: boolean;
	}) => React.ReactNode;

	/** Customizes the dropdown trigger icon. */
	triggerIcon?: React.ReactNode;

	/** Customizes the clear icon displayed when `clearable` is enabled. */
	clearIcon?: React.ReactNode;
}
