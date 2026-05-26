import type { HTMLAttributes } from 'vue';

export type ChipSize = 'sm' | 'md';
export type ChipColor = 'primary' | 'secondary' | 'error' | 'success' | 'warning';

export interface ChipProps extends /* @vue-ignore */ HTMLAttributes {
	label?: string;
	removable?: boolean;
	size?: ChipSize;
	color?: ChipColor;
	disabled?: boolean;
	clickable?: boolean;
	dataTestid?: string;
}

export type ChipEmits = {
	click: [event: MouseEvent];
	remove: [];
};

export type ChipSlots = {
	removeIcon?: () => void;
};
