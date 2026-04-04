import type { HoverCardRootProps } from '@ark-ui/vue/hover-card';

export interface HoverProps
	extends Pick<
		HoverCardRootProps,
		'defaultOpen' | 'open' | 'openDelay' | 'closeDelay' | 'disabled' | 'unmountOnExit' | 'lazyMount'
	> {
	positioning?: HoverCardRootProps['positioning'];
}

export type HoverEmits = {
	'update:open': [open: boolean];
};

export type HoverSlots = {
	trigger?: (props: { open: boolean }) => void;
	default?: (props: { open: boolean }) => void;
};
