import { type SelectRootEmits, type SelectRootProps } from '@ark-ui/vue/select';
import type { CommonFieldProps, SelectItem, VirtualizationConfig } from '@components/type';

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
