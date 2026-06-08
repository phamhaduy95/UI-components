import type { ProgressRootProps } from '@ark-ui/vue/progress';

export interface ProgressBarProps {
	/** The initial value of the progress bar when rendered. */
	defaultValue?: number | null;
	/** The controlled value of the progress bar. */
	modelValue?: number | null;
	/** The maximum allowed value of the progress bar. */
	max?: number;
	/** The minimum allowed value of the progress bar. */
	min?: number;
	/** The orientation of the element. */
	orientation?: 'horizontal' | 'vertical';
	/** The localized messages to use. */
	translations?: ProgressRootProps['translations'];
	/** The text label of the progress bar. */
	label?: string;
	/** Whether to show the value text. */
	showValueText?: boolean;
	/** The color of the progress bar. */
	color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
	/** The size of the progress bar. */
	size?: 'sm' | 'md' | 'lg';
}

export interface ProgressBarEmits {
	(e: 'update:modelValue', value: number | null): void;
	(e: 'valueChange', details: { value: number | null }): void;
}
