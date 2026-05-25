import type { ButtonHTMLAttributes } from 'vue';

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
	variant?: ButtonVariant;
	size?: ButtonSize;
	color?: ButtonColor;
	loading?: boolean;
	type?: 'button' | 'submit' | 'reset';
}

export type ButtonSlots = {
	default?: () => void;
};
