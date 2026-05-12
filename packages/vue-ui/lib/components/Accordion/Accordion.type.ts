import type { HTMLAttributes } from 'vue';

export interface AccordionItemObject extends /* @vue-ignore */ HTMLAttributes {
	// must be unique value
	value: string;
	title?: string;
	disabled?: boolean;
	content?: string;
	'aria-label'?: string;
}

export interface AccordionProps extends /* @vue-ignore */ HTMLAttributes {
	items: AccordionItemObject[];
	// Whether multiple accordion items can be expanded at the same time.
	multiple?: boolean;
	// Whether the accordion items can be collapsed.
	collapsible?: boolean;
	disabled?: boolean;
	modelValue?: string[];

	defaultValue?: string[];
	dataTestid?: string;
	lazyMount?: boolean;
	unmountOnExit?: boolean;
}

export type AccordionEmits = {
	'update:modelValue': [value: string[]];
	valueChange: [value: string[]];
};

export type AccordionSlots = {
	title?: (props: { item: AccordionItemObject }) => void;
	content?: (props: { item: AccordionItemObject }) => void;
};
