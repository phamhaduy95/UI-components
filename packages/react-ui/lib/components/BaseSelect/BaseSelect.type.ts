import { Select as ArkSelect } from '@ark-ui/react/select';
import * as React from 'react';
import { ComponentPropsWithRef, Ref } from 'react';

import { CommonFieldProps, SelectItem, VirtualizationConfig } from '@components/type';

export interface BaseSelectProps
	extends Omit<ComponentPropsWithRef<'div'>, 'defaultValue'>,
		CommonFieldProps<string[]> {
	/** The array of items (options) to be displayed in the select menu. Each item should have a label and a value. */
	items?: Array<SelectItem>;

	/** The placeholder text to display when no value is selected. */
	placeholder?: string;

	/** Ref to the outer container element. */
	ref?: Ref<HTMLDivElement>;

	/** Whether elements can be deselected. */
	deselectable?: boolean;

	/** Whether to loop through items when navigating with the keyboard. */
	loopFocus?: boolean;

	/** The name of the select field. */
	name?: string;

	/** Whether multiple items can be selected. */
	multiple?: boolean;

	/**
	 * Customizes the display of the selected value in the trigger.
	 * Can be a React node or a function receiving the supportingTextId.
	 */
	CustomValueText?: React.ReactNode | ((props: { supportingTextId: string }) => React.ReactNode);

	/** Callback fired when the selected value changes. */
	onValueChange?: ArkSelect.RootProps<SelectItem>['onValueChange'];

	/** Callback fired when the focus moves outside the component. */
	onFocusOutside?: ArkSelect.RootProps<SelectItem>['onFocusOutside'];

	/** Callback fired when the exit animation is complete. */
	onExitComplete?: ArkSelect.RootProps<SelectItem>['onExitComplete'];

	/** Unique identifier used for automation testing (e.g., data-testid attribute). */
	'data-testId'?: string;

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
