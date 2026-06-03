import type { HTMLAttributes } from 'vue';
import type { CommonFieldProps } from '@components/BaseField';
import type {
	EditableRootBaseProps as ArkEditableProps,
	EditableRootEmits
} from '@ark-ui/vue/editable';

export interface EditableProps extends CommonFieldProps<string>, /* @vue-ignore */ HTMLAttributes {
	dataTestid?: string;
	activationMode?: ArkEditableProps['activationMode'];
	submitMode?: ArkEditableProps['submitMode'];
	selectOnFocus?: ArkEditableProps['selectOnFocus'];
	autoResize?: ArkEditableProps['autoResize'];
	maxLength?: ArkEditableProps['maxLength'];
	showToggle?: boolean;
}

export type EditableEmits = {
	'update:modelValue': EditableRootEmits['update:modelValue'];
	valueChange: EditableRootEmits['valueChange'];
	'update:edit': EditableRootEmits['update:edit'];
	pointerDownOutside: EditableRootEmits['pointerDownOutside'];
	focusOutside: EditableRootEmits['focusOutside'];
	interactOutside: EditableRootEmits['interactOutside'];
};

export type EditableSlots = {
	label?: () => void;
	supportingText?: () => void;
	submitIcon?: () => void;
	cancelIcon?: () => void;
	editIcon?: () => void;
};
