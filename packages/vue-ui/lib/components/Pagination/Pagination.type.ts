import type { HTMLAttributes } from 'vue';

export type PaginationPageChangeDetails = {
	page: number;
	pageSize: number;
};

export interface PaginationProps extends /* @vue-ignore */ HTMLAttributes {
	/**
	 * Total number of data items.
	 */
	count: number;

	/**
	 * The controlled active page number (1-based).
	 * Bind with `v-model:page` for two-way control.
	 */
	page?: number;

	/**
	 * The initial active page when rendered (uncontrolled).
	 * Defaults to `1`.
	 */
	defaultPage?: number;

	/**
	 * The controlled number of data items per page.
	 * Bind with `v-model:pageSize` for two-way control.
	 */
	pageSize?: number;

	/**
	 * Number of sibling pages to show on each side of the current page.
	 * Defaults to `1`.
	 */
	siblingCount?: number;

	/**
	 * Whether to show the "First page" trigger button.
	 * Defaults to `false`.
	 */
	showFirstTrigger?: boolean;

	/**
	 * Whether to show the "Last page" trigger button.
	 * Defaults to `false`.
	 */
	showLastTrigger?: boolean;
	/**
	 * Value forwarded to the `data-testid` attribute on the root element.
	 */
	dataTestid?: string;
}

export interface PaginationEmits {
	/**
	 * Emitted when the active page changes (v-model:page).
	 */
	'update:page': [page: number];

	/**
	 * Emitted when the active page changes, providing full details.
	 */
	pageChange: [details: PaginationPageChangeDetails];
}

export type PaginationSlots = {
	/**
	 * Custom content for the "Previous page" trigger.
	 */
	prevTrigger(): void;

	/**
	 * Custom content for the "Next page" trigger.
	 */
	nextTrigger(): void;

	/**
	 * Custom content for the "First page" trigger (only shown when `showFirstTrigger` is `true`).
	 */
	firstTrigger(): void;

	/**
	 * Custom content for the "Last page" trigger (only shown when `showLastTrigger` is `true`).
	 */
	lastTrigger(): void;
};
