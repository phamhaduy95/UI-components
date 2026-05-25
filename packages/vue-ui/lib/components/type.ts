import type { VirtualListProps } from './VirtualList';

export type SelectItem = { value: string; label: string; disabled?: boolean };

export interface VirtualizationConfig
	extends Pick<VirtualListProps<SelectItem>, 'estimateSize' | 'overscan' | 'getItemKey'> {
	onStartReached?: () => void;
	onEndReached?: () => void;
}
