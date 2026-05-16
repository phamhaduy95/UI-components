import type { HTMLAttributes, Component } from 'vue';
import type { CommonFieldProps, FieldStatus } from '@components/type';

export interface BaseFieldProps extends /* @vue-ignore */ HTMLAttributes, CommonFieldProps<string> {
	labelElement?: string | Component;
	dataTestid?: string;
	inputId?: string;
}

interface LabelTextSlotProps {
	label?: string;
	isRequired: boolean;
	status?: FieldStatus;
}

interface LabelSlotProps {
	label?: string;
	isRequired?: boolean;
	status?: FieldStatus;
}

interface SupportingTextSlotProps {
	supportingText?: string;
	status?: FieldStatus;
	isRequired?: boolean;
}

export type BaseFieldSlots = {
	default?: () => void;
	label?: (props: LabelSlotProps) => void;
	labelText?: (props: LabelTextSlotProps) => void;
	supportingText?: (props: SupportingTextSlotProps) => void;
};
