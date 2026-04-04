import type { ButtonHTMLAttributes } from 'vue';

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

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
