import type { BaseSelectEmits, BaseSelectProps, BaseSelectSlots } from '@components/BaseSelect';

export type MultipleSelectProps = Omit<BaseSelectProps, 'multiple'> & {
	placeholder?: string;
};

export type MultipleSelectEmits = BaseSelectEmits;

export type MultipleSelectSlots = Pick<BaseSelectSlots, 'triggerIcon' | 'clearIcon'>;
