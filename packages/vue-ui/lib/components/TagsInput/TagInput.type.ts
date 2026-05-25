import type { TagsInputRootProps } from '@ark-ui/vue/tags-input';
import type { CommonFieldProps } from '@components/BaseField';

export interface TagInputProps
	extends CommonFieldProps<string[]>,
		Pick<TagsInputRootProps, 'maxLength' | 'allowOverflow' | 'max' | 'validate' | 'delimiter'> {
	dataTestid?: string;
	hideInput?: boolean;
}

export type TagInputEmits = {
	'update:modelValue': [value: string[]];
	valueChange: [value: string[]];
};

export type TagInputSlots = {
	item(props: { value: string; index: number; removeItem: () => void }): void;
};
