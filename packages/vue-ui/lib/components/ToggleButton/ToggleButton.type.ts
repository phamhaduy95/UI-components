import type { ButtonProps } from '@components/Button';
import type { ToggleRootEmits } from '@ark-ui/vue/toggle';

export interface ToggleButtonProps extends Omit<ButtonProps, 'variant'> {
	pressed?: boolean;
	defaultPressed?: boolean;
	disabled?: boolean;
}

export type ToggleButtonEmits = ToggleRootEmits;

export type ToggleButtonSlots = {
	default?(props: {
		pressed: boolean;
		disabled: boolean;
		setPressed(pressed: boolean): void;
	}): void;
};
