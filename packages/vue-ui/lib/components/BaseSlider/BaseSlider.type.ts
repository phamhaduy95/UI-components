import type { SliderRootProps as ArkSliderRootProps } from '@ark-ui/vue/slider';
import type { CommonFieldProps } from '@components/BaseField';
import type { HTMLAttributes } from 'vue';

export interface BaseSliderProps
	extends Pick<
			CommonFieldProps<number[]>,
			| 'required'
			| 'label'
			| 'size'
			| 'supportingText'
			| 'disabled'
			| 'name'
			| 'modelValue'
			| 'defaultValue'
			| 'readOnly'
		>,
		Pick<
			ArkSliderRootProps,
			| 'min'
			| 'max'
			| 'step'
			| 'origin'
			| 'thumbAlignment'
			| 'thumbCollisionBehavior'
			| 'minStepsBetweenThumbs'
		>,
		/* @vue-ignore */ HTMLAttributes {
	marks?: number[] | { value: number; label?: string }[];
	color?: 'primary' | 'success' | 'error' | 'warning' | 'secondary';
	dataTestid?: string;
	showValue?: boolean;
	hasHiddenInput?: boolean;
}

export type BaseSliderEmits = {
	'update:modelValue': [value: number[]];
	valueChange: [payload: { value: number[] }];
	valueChangeEnd: [payload: { value: number[] }];
};

interface TrailingSlotProps {
	value: number[];
	setValue: (value: number[]) => void;
	label?: string;
	labelId?: string;
}

interface ValueTextSlotProps {
	value: number[];
}

interface LabelSlotProps {
	label?: string;
	required?: boolean;
	value: number[];
}

interface SupportingTextSlotProps {
	supportingText: string;
}

export type BaseSliderSlots = {
	label: (props: LabelSlotProps) => void;
	supportingText: (props: SupportingTextSlotProps) => void;
	valueText: (props: ValueTextSlotProps) => void;
	trailing: (props: TrailingSlotProps) => void;
};
