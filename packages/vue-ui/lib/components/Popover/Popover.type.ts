import type { PopoverRootProps } from '@ark-ui/vue/popover';

export interface PopoverProps
	extends Pick<
		PopoverRootProps,
		| 'autoFocus'
		| 'open'
		| 'defaultOpen'
		| 'closeOnInteractOutside'
		| 'unmountOnExit'
		| 'closeOnEscape'
		| 'lazyMount'
	> {
	positioning?: PopoverRootProps['positioning'];
}

export type PopoverEmits = {
	'update:open': [open: boolean];
	exitComplete: [];
};

export type PopoverSlots = {
	trigger?: (props: { open: boolean; setOpen: (open: boolean) => void }) => void;
	default?: (props: { open: boolean; setOpen: (open: boolean) => void }) => void;
};
