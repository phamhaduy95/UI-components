import type { HTMLAttributes } from 'vue';
import type { FieldStatus } from '@components/type';

export interface SupportingTextProps extends /* @vue-ignore */ HTMLAttributes {
	status?: FieldStatus;
	show?: boolean;
}

export type SupportingTextSlots = {
	default?: () => void;
};
