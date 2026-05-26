import type { BaseSliderSlots, BaseSliderProps } from '@components/BaseSlider';

export interface SingleSliderProps
	extends Omit<BaseSliderProps, 'modelValue' | 'defaultValue' | 'hasHiddenInput'> {
	modelValue?: number;
	defaultValue?: number;
	editable?: boolean;
	numberInputLabel?: string;
	numberInputWidth?: string;
}

export type SingleSliderEmits = {
	'update:modelValue': [value: number];
	valueChange: [value: number];
	valueChangeEnd: [value: number];
};

export type SingleSliderSlots = Partial<BaseSliderSlots>;
