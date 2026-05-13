import type { HTMLAttributes } from 'vue';
import type { TabsRootProps } from '@ark-ui/vue/tabs';
export interface TabItemObject {
	value: string;
	title?: string;
	disabled?: boolean;
	'aria-label'?: string;
}

export interface TabsProps
	extends Pick<
			TabsRootProps,
			| 'orientation'
			| 'activationMode'
			| 'lazyMount'
			| 'unmountOnExit'
			| 'defaultValue'
			| 'modelValue'
		>,
		/* @vue-ignore */ HTMLAttributes {
	/** Array of tab items to render */
	items: TabItemObject[];
	/** Test ID for the component */
	dataTestid?: string;
	/** Whether tabs can be closed by the user */
	closable?: boolean;
}

export type TabsEmits = {
	'update:modelValue': [value: string];
	valueChange: [value: string];
	close: [value: string];
};

export type TabsSlots = {
	/** Custom slot for the tab trigger title */
	title?: (props: { item: TabItemObject }) => void;
	/** Fallback slot for the tab content if no specific dynamic slot is provided */
	content?: (props: { item: TabItemObject }) => void;
	/** Dynamic slot for specific tab content based on the item's value (e.g., #content-account) */
	[key: `content-${string}`]: (props: { item: TabItemObject }) => void;
};
