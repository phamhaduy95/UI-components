import type { ButtonProps } from '@components/Button';

export type IconButtonProps = ButtonProps & {
	shape?: 'square' | 'circle';
};

export type IconButtonSlots = {
	default?: () => void;
};
