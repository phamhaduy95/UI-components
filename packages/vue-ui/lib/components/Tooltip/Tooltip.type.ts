import type { TooltipRootProps } from '@ark-ui/vue/tooltip';

export interface TooltipProps
	extends Pick<
		TooltipRootProps,
		| 'defaultOpen'
		| 'open'
		| 'openDelay'
		| 'closeDelay'
		| 'disabled'
		| 'unmountOnExit'
		| 'lazyMount'
		| 'closeOnPointerDown'
		| 'closeOnScroll'
		| 'interactive'
	> {
	positioning?: TooltipRootProps['positioning'];
	arrow?: boolean;
	dataTestId?: string;
}

export type TooltipEmits = {
	'update:open': [open: boolean];
};

export type TooltipSlots = {
	trigger?(props: { open: boolean }): void;
	default?(props: { open: boolean }): void;
};
