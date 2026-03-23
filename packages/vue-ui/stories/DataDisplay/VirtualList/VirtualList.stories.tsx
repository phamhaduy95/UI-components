import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, waitFor, fn, userEvent, fireEvent } from 'storybook/test';
import { computed, ref } from 'vue';
import type { ItemType } from './ConcreteVirtualList.vue';
import ConcreteVirtualList from './ConcreteVirtualList.vue';
import { Button } from '@components/Button';
import type { VirtualListPublicInstance } from '@components/VirtualList';

const generateItems = (count: number): ItemType[] => {
	return Array.from({ length: count }).map((_, i) => ({
		id: i.toString(),
		label: `Row ${i}`
	}));
};

const defaultItems = generateItems(1000);

const variableSizes = Array.from({ length: 1000 }).map(() => Math.floor(Math.random() * 150) + 50);

const mockedOnScrolling = fn();
const mockedOnStartReached = fn();
const mockedOnEndReached = fn();
const mockedOnRangeChanged = fn();

const meta = {
	title: 'Components/DataDisplay/VirtualList',
	component: ConcreteVirtualList,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		items: {
			description: 'Array of data items to render in the list.',
			control: false
		},
		estimateSize: {
			description: 'Function that returns the estimated size (px) for each item by index.',
			control: false
		},
		horizontal: {
			description: 'Renders the list horizontally instead of vertically.',
			control: 'boolean'
		},
		dynamicSize: {
			description: 'Enables dynamic item size measurement via ResizeObserver.',
			control: 'boolean'
		},
		overscan: {
			description: 'Number of items to render beyond the visible viewport on each side.',
			control: { type: 'number', min: 0 }
		},
		totalCount: {
			description: 'Override the total item count (useful for server-side pagination).',
			control: { type: 'number', min: 0 }
		},
		getItemKey: {
			description: 'Function to derive a unique key per item.',
			control: false
		},
		// Events
		onScrolling: {
			description: 'Fired while the list is scrolling, with scroll direction and offset.',
			action: 'scrolling'
		},
		onEndReached: {
			description: 'Fired when the last item enters the visible viewport.',
			action: 'endReached'
		},
		onStartReached: {
			description: 'Fired when the first item enters the visible viewport.',
			action: 'startReached'
		},
		onRangeChanged: {
			description: 'Fired whenever the visible index range changes, with startIndex and endIndex.',
			action: 'rangeChanged'
		}
	},
	args: {
		estimateSize: () => 90,
		class: 'h-[300px] overflow-auto border border-gray-300',
		dataTestid: 'virtual-list-default'
	},
	beforeEach() {
		mockedOnScrolling.mockClear();
		mockedOnStartReached.mockClear();
		mockedOnEndReached.mockClear();
		mockedOnRangeChanged.mockClear();
	},
	render: (args) => ({
		components: { ConcreteVirtualList },
		setup() {
			return () => (
				<ConcreteVirtualList {...args}>
					{{
						itemContent: ({ itemData }: { itemData: ItemType }) => (
							<div class="w-full h-12 border-b border-gray-500 box-border flex items-center p-4">
								{itemData.label}
							</div>
						)
					}}
				</ConcreteVirtualList>
			);
		}
	})
} satisfies Meta<typeof ConcreteVirtualList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const VerticalFixedSize: Story = {
	args: {
		items: defaultItems,
		estimateSize: () => 90
	},
	render: (args) => ({
		components: { ConcreteVirtualList },
		setup() {
			return () => (
				<ConcreteVirtualList {...args}>
					{{
						itemContent: ({ itemData }: { itemData: ItemType }) => (
							<div class="w-full h-[90px] border-b border-gray-300 box-border flex items-center p-4">
								{itemData.label}
							</div>
						)
					}}
				</ConcreteVirtualList>
			);
		}
	})
};

export const HorizontalFixedSize: Story = {
	args: {
		items: defaultItems,
		horizontal: true,
		estimateSize: () => 100
	},
	render: (args) => ({
		components: { ConcreteVirtualList },
		setup() {
			return () => (
				<ConcreteVirtualList class="w-full h-28 overflow-auto border border-gray-200" {...args}>
					{{
						itemContent: ({ itemData }: { index: number; itemData: ItemType }) => (
							<div class="w-full h-full border-r border-gray-300 flex items-center justify-center">
								{itemData.label}
							</div>
						)
					}}
				</ConcreteVirtualList>
			);
		}
	})
};

export const VerticalVariableSize: Story = {
	args: {
		items: defaultItems,
		estimateSize: (index) => variableSizes[index] ?? 50
	},
	render: (args) => ({
		components: { ConcreteVirtualList },
		setup() {
			return () => (
				<ConcreteVirtualList class="h-[400px] overflow-auto" {...args}>
					{{
						itemContent: ({ index, itemData }: { index: number; itemData: ItemType }) => (
							<div
								class="w-full border-b border-gray-200 box-border flex items-center p-4"
								style={{
									height: `${variableSizes[index]}px`
								}}
							>
								{itemData.label} (Size: {variableSizes[index]}px)
							</div>
						)
					}}
				</ConcreteVirtualList>
			);
		}
	})
};

export const HorizontalVariableSize: Story = {
	args: {
		items: defaultItems,
		estimateSize: (index) => variableSizes[index] ?? 50,
		horizontal: true
	},
	render: (args) => ({
		components: { ConcreteVirtualList },
		setup() {
			return () => (
				<ConcreteVirtualList class="h-[400px] w-full overflow-auto" {...args}>
					{{
						itemContent: ({ index, itemData }: { index: number; itemData: ItemType }) => (
							<div
								class="flex items-center justify-center p-2 h-full border-r border-slate-200"
								style={{
									width: `${variableSizes[index]}px`
								}}
							>
								{itemData.label}
							</div>
						)
					}}
				</ConcreteVirtualList>
			);
		}
	})
};

export const HorizontalDynamicSize: Story = {
	args: {
		items: defaultItems,
		horizontal: true,
		dynamicSize: true,
		estimateSize: () => 100
	},
	render: (args) => ({
		components: { ConcreteVirtualList },
		setup() {
			return () => (
				<ConcreteVirtualList class="w-full h-28 overflow-auto" {...args}>
					{{
						itemContent: ({ index, itemData }: { index: number; itemData: ItemType }) => (
							<div class="h-full w-max border-r border-slate-200 box-border flex items-center justify-center p-4 whitespace-nowrap">
								{itemData.label} ({variableSizes[index]}px)
							</div>
						)
					}}
				</ConcreteVirtualList>
			);
		}
	})
};

export const VerticalDynamicSize: Story = {
	args: {
		items: defaultItems,
		dynamicSize: true,
		estimateSize: () => 100
	},
	render: (args) => ({
		components: { ConcreteVirtualList },
		setup() {
			return () => (
				<ConcreteVirtualList class="h-[500px] border border-gray-300" {...args}>
					{{
						itemContent: ({ itemData, index }: { itemData: ItemType; index: number }) => (
							<div
								class="border-b border-slate-100 p-5 box-border"
								style={{
									height: `${variableSizes[index]}px`
								}}
							>
								{itemData.label}
							</div>
						)
					}}
				</ConcreteVirtualList>
			);
		}
	})
};

export const ScrollingEvent: Story = {
	args: {
		items: defaultItems,
		estimateSize: () => 50,
		onScrolling: mockedOnScrolling
	},

	play: async ({ canvas, step }) => {
		const container = canvas.getByTestId('virtual-list-default');

		await step('Scroll down and check if scrolling event was called', async () => {
			await fireEvent.scroll(container, { target: { scrollTop: 500 } });
			await waitFor(() => {
				expect(mockedOnScrolling).toHaveBeenCalled();
			});
		});
	}
};

export const StartReachedEvent: Story = {
	args: {
		items: defaultItems,
		estimateSize: () => 50,
		onStartReached: mockedOnStartReached
	},
	play: async ({ _canvas, step }) => {
		await step('Check if startReached was called on mount', async () => {
			await waitFor(() => {
				expect(mockedOnStartReached).toHaveBeenCalled();
			});
		});
	}
};

export const EndReachedEvent: Story = {
	args: {
		items: defaultItems,
		estimateSize: () => 50,
		onEndReached: mockedOnEndReached
	},
	play: async ({ canvas, step }) => {
		const container = canvas.getByTestId('virtual-list-default');

		await step('Scroll to bottom and check if endReached was called', async () => {
			await fireEvent.scroll(container, { target: { scrollTop: container.scrollHeight } });
			await waitFor(() => {
				expect(mockedOnEndReached).toHaveBeenCalled();
			});
		});
	}
};

export const RangeChangedEvent: Story = {
	args: {
		items: defaultItems,
		estimateSize: () => 50,
		onRangeChanged: mockedOnRangeChanged
	},
	play: async ({ canvas, step }) => {
		const container = canvas.getByTestId('virtual-list-default');

		await step('rangeChanged is called on initial render with visible range', async () => {
			await waitFor(() => {
				expect(mockedOnRangeChanged).toHaveBeenCalled();
				const calls = mockedOnRangeChanged.mock.calls;
				const lastCall = calls[calls.length - 1]?.[0] as { startIndex: number; endIndex: number };
				expect(lastCall.startIndex).toBe(0);
				expect(lastCall.endIndex).toBeGreaterThan(0);
			});
		});

		await step('rangeChanged updates when scrolled', async () => {
			await fireEvent.scroll(container, { target: { scrollTop: 1000 } });
			await waitFor(() => {
				const calls = mockedOnRangeChanged.mock.calls;
				const lastCall = calls[calls.length - 1]?.[0] as { startIndex: number; endIndex: number };
				expect(lastCall.startIndex).toBeGreaterThan(0);
			});
		});
	}
};

export const ScrollingMethods: Story = {
	args: {
		items: defaultItems,
		estimateSize: () => 50
	},
	render: (args) => ({
		components: { ConcreteVirtualList, Button },
		setup() {
			const listRef = ref<VirtualListPublicInstance>();
			return { args, listRef };
		},
		template: `
			<div>
				<div class="flex gap-2 mb-4">
					<Button @click="listRef.scrollBy(100)" >Scroll By 100px</Button>
					<Button @click="listRef.scrollToOffset(1500)" >Scroll To Offset 1500px</Button>
					<Button @click="listRef.scrollToIndex(500)" >Scroll To Index 500</Button>
                    <Button @click="listRef.scrollToOffset(0)" >Scroll to Top</Button>
                    <Button @click="listRef.scrollToBottom()" >Scroll to Bottom</Button>
				</div>
				<ConcreteVirtualList ref="listRef" v-bind="args">
					<template #header>
						<div class="h-[50px] border-b border-slate-200 flex items-center px-2">
							Header
						</div>
					</template>
					<template #itemContent="{ itemData }">
						<div class="h-[50px] border-b border-slate-200 flex items-center px-2">
							{{ itemData.label }}
						</div>
					</template>
					<template #footer>
						<div class="h-[50px] border-b border-slate-200 flex items-center px-2">
							Footer
						</div>
					</template>
				</ConcreteVirtualList>
			</div>
		`
	}),
	play: async ({ canvas, step, args }) => {
		const { dataTestid = 'virtual-list-default' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Scroll by 100px', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Scroll By 100px' }));
			await waitFor(() => {
				expect(container.scrollTop).toBeGreaterThan(0);
			});
		});

		await step('Scroll to offset 1500px', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Scroll To Offset 1500px' }));
			await waitFor(() => {
				expect(container.scrollTop).toBe(1500);
			});
		});

		await step('Scroll to index 500', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Scroll To Index 500' }));
			await waitFor(() => {
				const item = canvas.getByText('Row 500');
				expect(item).toBeVisible();
			});
		});

		await step('Scroll to Bottom', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Scroll to Bottom' }));
			await waitFor(() => {
				const footer = canvas.getByText('Footer');
				expect(footer).toBeVisible();
			});
		});

		await step('Scroll to Top', async () => {
			await userEvent.click(canvas.getByRole('button', { name: 'Scroll to Top' }));
			await waitFor(() => {
				const header = canvas.getByText('Header');
				expect(header).toBeVisible();
			});
		});
	}
};

export const LoadMoreOnEndReached: Story = {
	args: {
		items: defaultItems,
		estimateSize: () => 60
	},
	render: (args) => ({
		components: { ConcreteVirtualList },
		setup() {
			const PAGE_SIZE = 30;
			const LOADING_DELAY = 200;
			const MAX_COUNT = 2;
			const items = ref(generateItems(PAGE_SIZE));

			const loadCount = ref(0);
			const isLoading = ref(false);

			const loadMore = async () => {
				if (loadCount.value > MAX_COUNT) return;
				if (isLoading.value) return;
				try {
					isLoading.value = true;
					// Simulate network delay
					await new Promise((resolve) => setTimeout(resolve, LOADING_DELAY));
					const nextBatch = generateItems(PAGE_SIZE).map((_item, i) => ({
						id: String(items.value.length + i),
						label: `Row ${items.value.length + i}`
					}));

					items.value.push(...nextBatch);
				} finally {
					isLoading.value = false;
					loadCount.value++;
				}
			};

			const shouldShowFooter = computed(() => {
				return isLoading.value && loadCount.value <= MAX_COUNT;
			});

			return { args, items, isLoading, loadMore, shouldShowFooter };
		},
		template: `
			<ConcreteVirtualList
				v-bind="{ ...args, items }"
				class="TestClass"
				@end-reached="loadMore"
			>
				<template #itemContent="{ itemData }">
					<div class="h-[60px] border-b border-slate-200 flex items-center px-4 text-sm">
						{{ itemData.label }}
					</div>
				</template>
				<template #footer v-if="shouldShowFooter">
					<div
						class="flex w-full items-center justify-center p-3 gap-2 text-slate-500 text-[13px]"
						data-testid="loading-indicator"
					>
						<svg
							class="w-4 h-4 animate-spin"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25" stroke-width="3" />
							<path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
						</svg>
						Loading more...
					</div>
				</template>
			</ConcreteVirtualList>
		`
	}),
	play: async ({ canvas, step, args }) => {
		const { dataTestid = 'virtual-list-default' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Scroll down to load first batch (Row 30 to 59)', async () => {
			await fireEvent.scroll(container, { target: { scrollTop: container.scrollHeight } });

			await waitFor(() => {
				const loadMore = canvas.queryByTestId('loading-indicator');
				expect(loadMore).toBeVisible();
			});
		});

		await step('Check if next batch is loaded', async () => {
			await waitFor(
				() => {
					const loadMore = canvas.queryByTestId('loading-indicator');
					expect(loadMore).not.toBeInTheDocument();
				},
				{ timeout: 400 }
			);
			expect(canvas.queryByText('Row 30')).toBeInTheDocument();
		});

		await step('Scroll down again to load second batch (Row 60 to 89)', async () => {
			await fireEvent.scroll(container, { target: { scrollTop: container.scrollHeight } });

			await waitFor(
				() => {
					const loadMore = canvas.queryByTestId('loading-indicator');
					expect(loadMore).not.toBeInTheDocument();
				},
				{ timeout: 400 }
			);
			await fireEvent.scroll(container, { target: { scrollTop: container.scrollTop + 200 } });
			await waitFor(() => {
				expect(canvas.queryByText('Row 60')).toBeInTheDocument();
			});
		});
	}
};

export const StickyHeader: Story = {
	args: {
		items: defaultItems,
		estimateSize: () => 50,
		stickyHeader: true
	},
	render: (args) => ({
		components: { ConcreteVirtualList },
		setup() {
			return () => (
				<ConcreteVirtualList {...args}>
					{{
						header: () => (
							<div
								data-testid="header"
								class="sticky top-0 z-10 bg-slate-800 text-slate-50 px-4 py-2.5 font-semibold text-[13px] tracking-widest uppercase border-b border-slate-700"
							>
								👤 Name
							</div>
						),
						itemContent: ({ itemData }: { itemData: ItemType }) => (
							<div class="h-[50px] flex items-center px-4 border-b border-slate-200 text-sm">
								{itemData.label}
							</div>
						)
					}}
				</ConcreteVirtualList>
			);
		}
	}),
	play: async ({ canvas, step, args }) => {
		const { dataTestid = 'virtual-list-default' } = args;
		const container = canvas.getByTestId(dataTestid as string);
		const header = canvas.getByTestId('header');

		await step('Header is visible initially', async () => {
			expect(header).toBeVisible();
		});

		await step('Scroll down and verify header remains visible', async () => {
			await fireEvent.scroll(container, { target: { scrollTop: 1000 } });
			await waitFor(() => {
				expect(header).toBeVisible();
			});
		});
	}
};

export const StaticHeader: Story = {
	args: {
		items: defaultItems,
		estimateSize: () => 50,
		stickyHeader: false
	},
	render: (args) => ({
		components: { ConcreteVirtualList },
		setup() {
			return () => (
				<ConcreteVirtualList {...args}>
					{{
						header: () => (
							<div
								data-testid="header"
								class="bg-amber-100 p-4 border-b border-amber-200 text-amber-900 font-bold"
							>
								Static Header (Scrolls Away)
							</div>
						),
						itemContent: ({ itemData }: { itemData: ItemType }) => (
							<div class="h-[50px] flex items-center px-4 border-b border-slate-200">
								{itemData.label}
							</div>
						)
					}}
				</ConcreteVirtualList>
			);
		}
	})
};

export const StaticFooter: Story = {
	args: {
		items: generateItems(20),
		estimateSize: () => 50
	},
	render: (args) => ({
		components: { ConcreteVirtualList },
		setup() {
			return () => (
				<ConcreteVirtualList {...args}>
					{{
						itemContent: ({ itemData }: { itemData: ItemType }) => (
							<div class="h-[50px] flex items-center px-4 border-b border-slate-200">
								{itemData.label}
							</div>
						),
						footer: () => (
							<div
								data-testid="footer"
								class="bg-indigo-100 p-4 text-indigo-900 font-bold text-center"
							>
								Reached the bottom!
							</div>
						)
					}}
				</ConcreteVirtualList>
			);
		}
	}),
	play: async ({ canvas, step, args }) => {
		const { dataTestid = 'virtual-list-default' } = args;
		const container = canvas.getByTestId(dataTestid as string);
		const footer = canvas.getByTestId('footer');

		await step('Scroll down to check if footer becomes visible', async () => {
			await fireEvent.scroll(container, { target: { scrollTop: container.scrollHeight } });
			await waitFor(() => {
				expect(footer).toBeVisible();
			});
		});
	}
};

export const HorizontalWithHeader: Story = {
	args: {
		items: defaultItems,
		horizontal: true,
		estimateSize: () => 120,
		stickyHeader: true
	},
	render: (args) => ({
		components: { ConcreteVirtualList },
		setup() {
			return () => (
				<ConcreteVirtualList class="w-full h-32 overflow-auto border border-gray-200" {...args}>
					{{
						header: () => (
							<div
								data-testid="header"
								class="h-full w-max px-6 flex items-center bg-blue-50 border-r border-blue-200 text-blue-800 font-bold whitespace-nowrap"
							>
								Start of List ⮕
							</div>
						),
						itemContent: ({ itemData }: { itemData: ItemType }) => (
							<div class="h-full w-[120px] flex items-center justify-center border-r border-slate-200 text-sm">
								{itemData.label}
							</div>
						)
					}}
				</ConcreteVirtualList>
			);
		}
	})
};
