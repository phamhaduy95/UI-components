import type { CommonFieldProps } from '@components/type';
import type { HTMLAttributes } from 'vue';
import type { SliderRootProps as ArkSliderRootProps } from '@ark-ui/vue/slider';

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
}

export type BaseSliderEmits = {
	'update:modelValue': [value: number[]];
	valueChange: [payload: { value: number[] }];
	valueChangeEnd: [payload: { value: number[] }];
};

export type BaseSliderSlots = {
	valueText: (props: { value: number[] }) => void;
};
