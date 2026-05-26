import type { PopoverRootBaseProps } from '@ark-ui/vue/popover';
import type { PositioningOptions } from '@zag-js/popper';

export type PopoverProps = Pick<
	PopoverRootBaseProps,
	| 'autoFocus'
	| 'open'
	| 'defaultOpen'
	| 'closeOnInteractOutside'
	| 'unmountOnExit'
	| 'closeOnEscape'
	| 'lazyMount'
> & {
	positioning?: PositioningOptions;
};

export type PopoverEmits = {
	'update:open': [open: boolean];
	exitComplete: [];
};

export type PopoverSlots = {
	trigger?: (props: { open: boolean; setOpen: (open: boolean) => void }) => void;
	default?: (props: { open: boolean; setOpen: (open: boolean) => void }) => void;
};
