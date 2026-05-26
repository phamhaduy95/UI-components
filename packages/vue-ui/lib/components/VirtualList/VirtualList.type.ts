import { type HTMLAttributes } from 'vue';
import type { ScrollToOptions } from '@tanstack/vue-virtual';

export type ScrollDirection = 'forward' | 'backward';

export interface VirtualListProps<TData> extends /* @vue-ignore */ HTMLAttributes {
	/** Switches the scroll axis from vertical to horizontal. When `true`, items are laid out in a row and the list scrolls left-to-right. Defaults to `false`. */
	horizontal?: boolean;

	/** The full dataset to be virtualised. Only the visible slice is rendered in the DOM at any given time. */
	items: TData[];

	/**
	 * A function that produces a stable, unique key for each item.
	 * When omitted the component falls back to the numeric index as the key.
	 */
	getItemKey?: (index: number) => string;

	/**
	 * How many extra items to keep rendered beyond the visible boundary on each side.
	 * A higher value reduces the chance of blank flashes during fast scrolling at the cost of rendering more DOM nodes.
	 * Defaults to `1`.
	 */
	overscan?: number;

	/**
	 * Lets you pin the total item count independently from the length of `items`.
	 * Useful for server-side pagination where the full dataset has not yet been fetched but the total number of rows is known.
	 * When omitted, `items.length` is used.
	 */
	totalCount?: number;

	/**
	 * A function that returns the expected size (in pixels) for the item at the given index.
	 * Used to pre-calculate scroll positions before the item is mounted.
	 * For fixed-size lists pass a constant: `() => 50`.
	 * For variable-size lists vary the return value per index.
	 */
	estimateSize: (index: number) => number;

	/**
	 * When `true`, the component measures each mounted item's actual size via a `ResizeObserver` and reconciles the scroll positions accordingly.
	 * Enable this when item heights (or widths in horizontal mode) can change after mount, e.g. expandable rows or text that wraps differently at different viewport widths.
	 */
	dynamicSize?: boolean;

	/** Value forwarded to the `data-testid` attribute on the scroll container. Primarily intended for automated browser tests. */
	dataTestid?: string;
	/**
	 * The initial scroll offset in pixels.
	 * Defaults to `0`.
	 */
	initialOffset?: number;

	/**
	 * Whether the header should be sticky.
	 * Defaults to `false`.
	 */
	stickyHeader?: boolean;
}

export type VirtualListSlots<TData> = {
	/**
	 * Template for each individual row (or column in horizontal mode).
	 * @param index - Zero-based position of the item in the dataset.
	 * @param itemData - The data object for the item at this position.
	 */
	itemContent(props: { index: number; itemData: TData }): void;

	/**
	 * Optional content rendered at the very end of the scrollable area, after the last virtual item.
	 */
	footer?(): void;

	/**
	 * Optional content rendered at the very top of the scrollable area, before the first virtual item.
	 */
	header?(): void;
};

export interface VirtualListEmits {
	/**
	 * Fires continuously while the user is scrolling.
	 * @param direction - `'forward'` when scrolling toward the end, `'backward'` when scrolling toward the start.
	 * @param offsetInPixel - The current scroll offset in pixels from the start of the list.
	 */
	scrolling: [{ direction: ScrollDirection; offsetInPixel: number }];

	/** Emitted when the last item in the dataset enters the visible viewport. Use this to trigger loading the next page in an infinite-scroll setup. */
	endReached: [];

	/** Emitted when the first item in the dataset enters the visible viewport. Useful for "scroll-to-top" indicators or pulling to refresh. */
	startReached: [];

	/**
	 * Emitted whenever the set of rendered items changes, providing the new visible index boundaries.
	 * @param startIndex - Zero-based index of the first currently visible item.
	 * @param endIndex - Zero-based index of the last currently visible item.
	 */
	rangeChanged: [{ startIndex: number; endIndex: number }];
}

export interface VirtualListPublicInstance {
	/**
	 * Moves the scroll position by the given number of pixels relative to its current location.
	 * Negative values scroll backward; positive values scroll forward.
	 * @param offset - Pixel delta to apply.
	 * @param options - Optional scroll behaviour options (e.g. `{ behavior: 'smooth' }`).
	 */
	scrollBy: (offset: number, options?: ScrollToOptions) => void;

	/**
	 * Scrolls the list so that the item at the specified index becomes visible.
	 * @param index - Zero-based index of the target item.
	 * @param options - Optional alignment and behaviour options.
	 */
	scrollToIndex: (index: number, options?: ScrollToOptions) => void;

	/**
	 * Scrolls the list to an exact pixel offset from the start.
	 * @param offset - Target scroll position in pixels.
	 * @param options - Optional scroll behaviour options (e.g. `{ behavior: 'smooth' }`).
	 */
	scrollToOffset: (offset: number, options?: ScrollToOptions) => void;

	scrollToBottom: (options?: ScrollToOptions) => void;
}
