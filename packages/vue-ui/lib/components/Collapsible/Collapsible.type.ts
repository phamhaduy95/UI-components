import type { HTMLAttributes } from 'vue';

export interface CollapsibleProps extends /* @vue-ignore */ HTMLAttributes {
	title?: string;
	content?: string;
	collapsedHeight?: string | number;
	collapsedWidth?: string | number;
	defaultOpen?: boolean;
	disabled?: boolean;
	lazyMount?: boolean;
	open?: boolean;
	unmountOnExit?: boolean;
}

export type CollapsibleEmits = {
	'update:open': [open: boolean];
	openChange: [open: boolean];
	exitComplete: [];
};

export type CollapsibleSlotProps = {
	open: boolean;
	title?: string;
	content?: string;
	disabled?: boolean;
};

export type CollapsibleSlots = {
	title: (props: CollapsibleSlotProps) => void;
	indicator: (props: CollapsibleSlotProps) => void;
	content: (props: CollapsibleSlotProps) => void;
};
