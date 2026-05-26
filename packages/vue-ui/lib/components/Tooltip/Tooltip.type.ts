import type { TooltipRootProps } from '@ark-ui/vue/tooltip';
import type { PositioningOptions } from '@zag-js/popper';

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
	positioning?: PositioningOptions;
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
