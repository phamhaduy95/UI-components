import { useRef, useState } from 'react';
import { expect, fn, userEvent, waitFor } from 'storybook/test';

import { Button } from '@components/Button';
import type { VirtualListPublicInstance } from '@components/VirtualList';
import { VirtualList } from '@components/VirtualList';

import type { Meta, StoryObj } from '@storybook/react-vite';

type ItemType = {
	id: string;
	label: string;
};

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
	component: VirtualList,
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
		onScrolling: {
			description: 'Fired while the list is scrolling, with scroll direction and offset.',
			action: 'onScrolling'
		},
		onEndReached: {
			description: 'Fired when the last item enters the visible viewport.',
			action: 'onEndReached'
		},
		onStartReached: {
			description: 'Fired when the first item enters the visible viewport.',
			action: 'onStartReached'
		},
		onRangeChanged: {
			description: 'Fired whenever the visible index range changes, with startIndex and endIndex.',
			action: 'onRangeChanged'
		}
	},
	args: {
		className: 'h-[300px] overflow-auto border border-gray-300',
		dataTestid: 'virtual-list-default',
		children: () => <></>
	},
	beforeEach() {
		mockedOnScrolling.mockClear();
		mockedOnStartReached.mockClear();
		mockedOnEndReached.mockClear();
		mockedOnRangeChanged.mockClear();
	},
	render: (args) => (
		<VirtualList {...args}>
			{({ itemData }: { index: number; itemData: ItemType }) => (
				<div className="box-border flex h-full w-full items-center border-b border-gray-500 p-4">
					{itemData.label}
				</div>
			)}
		</VirtualList>
	)
} as Meta<typeof VirtualList<ItemType>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const VerticalFixedSize: Story = {
	args: {
		items: defaultItems,
		estimateSize: () => 90
	},
	render: (args) => (
		<VirtualList {...args}>
			{({ itemData }: { itemData: ItemType }) => (
				<div className="box-border flex h-[90px] w-full items-center border-b border-gray-300 p-4">
					{itemData.label}
				</div>
			)}
		</VirtualList>
	)
};

export const HorizontalFixedSize: Story = {
	args: {
		items: defaultItems,
		horizontal: true,
		estimateSize: () => 100,
		className: 'w-full h-28 overflow-auto border border-gray-400'
	},
	render: (args) => (
		<VirtualList {...args}>
			{({ itemData }: { index: number; itemData: ItemType }) => (
				<div className="flex h-full w-full items-center justify-center border-r border-gray-300">
					{itemData.label}
				</div>
			)}
		</VirtualList>
	)
};

export const VerticalVariableSize: Story = {
	args: {
		items: defaultItems,
		estimateSize: (index) => variableSizes[index] ?? 50
	},
	render: (args) => (
		<VirtualList {...args}>
			{({ index, itemData }) => (
				<div
					className="box-border flex w-full items-center border-b border-gray-200 p-4"
					style={{
						height: `${variableSizes[index]}px`
					}}
				>
					{itemData.label} (Size: {variableSizes[index]}px)
				</div>
			)}
		</VirtualList>
	)
};

export const HorizontalVariableSize: Story = {
	args: {
		items: defaultItems,
		estimateSize: (index) => variableSizes[index] ?? 50,
		horizontal: true
	},
	render: (args) => (
		<VirtualList {...args}>
			{({ index, itemData }: { index: number; itemData: ItemType }) => (
				<div
					className="flex h-full items-center justify-center border-r border-gray-400 p-2"
					style={{
						width: `${variableSizes[index]}px`
					}}
				>
					{itemData.label}
				</div>
			)}
		</VirtualList>
	)
};

export const HorizontalDynamicSize: Story = {
	args: {
		items: defaultItems,
		horizontal: true,
		dynamicSize: true,
		estimateSize: () => 100,
		className: 'w-full h-28 overflow-auto'
	},
	render: (args) => (
		<VirtualList {...args}>
			{({ index, itemData }: { index: number; itemData: ItemType }) => (
				<div className="box-border flex h-full w-max items-center justify-center whitespace-nowrap border-r border-gray-400 p-4">
					{itemData.label} ({variableSizes[index]}px)
				</div>
			)}
		</VirtualList>
	)
};

export const VerticalDynamicSize: Story = {
	args: {
		items: defaultItems,
		dynamicSize: true,
		estimateSize: () => 100
	},
	render: (args) => (
		<VirtualList {...args}>
			{({ index, itemData }: { itemData: ItemType; index: number }) => (
				<div
					className="box-border border-b border-gray-400 p-5"
					style={{
						height: `${variableSizes[index]}px`
					}}
				>
					{itemData.label}
				</div>
			)}
		</VirtualList>
	)
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
			container.scrollTop = 500;
			await waitFor(() => {
				expect(mockedOnScrolling).toHaveBeenCalled();
			});
		});
	}
};

export const StartReachedEvent: Story = {
	args: {
		items: defaultItems,
		estimateSize: () => 150,
		onStartReached: mockedOnStartReached
	},
	render: (args) => (
		<VirtualList {...args}>
			{({ itemData }: { index: number; itemData: ItemType }) => (
				<div
					style={{ height: '150px' }}
					className="box-border flex w-full items-center border-b border-gray-500 p-4"
				>
					{itemData.label}
				</div>
			)}
		</VirtualList>
	),
	play: async ({ step }) => {
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
			container.scrollTop = container.scrollHeight;
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
			container.scrollTop = 1000;
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
	render: function Render(args) {
		const listRef = useRef<VirtualListPublicInstance>(null);

		return (
			<div>
				<div className="mb-4 flex gap-2">
					<Button onClick={() => listRef.current?.scrollBy(100)}>Scroll By 100px</Button>
					<Button onClick={() => listRef.current?.scrollToOffset(1500)}>
						Scroll To Offset 1500px
					</Button>
					<Button onClick={() => listRef.current?.scrollToIndex(500)}>Scroll To Index 500</Button>
					<Button onClick={() => listRef.current?.scrollToOffset(0)}>Scroll to Top</Button>
					<Button onClick={() => listRef.current?.scrollToBottom()}>Scroll to Bottom</Button>
				</div>
				<VirtualList
					{...args}
					ref={listRef}
					header={
						<div className="flex h-[50px] items-center border-b border-slate-200 px-2">Header</div>
					}
					footer={
						<div className="flex h-[50px] items-center border-b border-slate-200 px-2">Footer</div>
					}
				>
					{({ itemData }: { itemData: ItemType }) => (
						<div className="flex h-[50px] items-center border-b border-slate-200 px-2">
							{itemData.label}
						</div>
					)}
				</VirtualList>
			</div>
		);
	},
	play: async ({ canvas, step, args }) => {
		const { dataTestid = '' } = args;
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
	render: (args) => {
		const PAGE_SIZE = 30;
		const LOADING_DELAY = 200;
		const MAX_COUNT = 1;

		const [items, setItems] = useState<ItemType[]>(generateItems(PAGE_SIZE));
		const [loadCount, setLoadCount] = useState(0);
		const [isLoading, setIsLoading] = useState(false);

		const loadMore = async () => {
			if (loadCount > MAX_COUNT) return;
			if (isLoading) return;

			setIsLoading(true);
			setTimeout(() => {
				const nextBatch = generateItems(PAGE_SIZE).map((_item, i) => ({
					id: String(items.length + i),
					label: `Row ${items.length + i}`
				}));

				setItems((prev) => [...prev, ...nextBatch]);
				setIsLoading(false);
				setLoadCount((prev) => prev + 1);
			}, LOADING_DELAY);
		};

		const shouldShowFooter = isLoading && loadCount <= MAX_COUNT;

		return (
			<VirtualList
				{...args}
				items={items}
				onEndReached={loadMore}
				footer={
					shouldShowFooter ? (
						<div
							className="flex w-full items-center justify-center gap-2 p-3 text-[13px] text-slate-500"
							data-testid="loading-indicator"
						>
							<svg
								className="h-4 w-4 animate-spin"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeOpacity="0.25"
									strokeWidth="3"
								/>
								<path
									d="M12 2a10 10 0 0 1 10 10"
									stroke="currentColor"
									strokeWidth="3"
									strokeLinecap="round"
								/>
							</svg>
							Loading more...
						</div>
					) : null
				}
			>
				{({ itemData }) => (
					<div className="flex h-[60px] items-center border-b border-slate-200 px-4 text-sm">
						{itemData.label}
					</div>
				)}
			</VirtualList>
		);
	},
	play: async ({ canvas, step, args }) => {
		const { dataTestid = 'virtual-list-default' } = args;

		const container = canvas.getByTestId(dataTestid);

		await step('Scroll down to load first batch (Row 30 to 59)', async () => {
			container.scrollTop = container.scrollHeight;

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
				{ timeout: 300 }
			);
			expect(canvas.queryByText('Row 30')).toBeInTheDocument();
		});

		await step('Scroll down again to load second batch (Row 60 to 89)', async () => {
			container.scrollTop = container.scrollHeight;

			await waitFor(
				() => {
					const loadMore = canvas.queryByTestId('loading-indicator');
					expect(loadMore).not.toBeInTheDocument();
				},
				{ timeout: 300 }
			);
			container.scrollTop = container.scrollTop + 200;
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
	render: (args) => (
		<VirtualList
			{...args}
			header={
				<div
					data-testid="header"
					className="sticky top-0 z-10 border-b border-slate-700 bg-slate-800 px-4 py-2.5 text-[13px] font-semibold uppercase tracking-widest text-slate-50"
				>
					👤 Name
				</div>
			}
		>
			{({ itemData }) => (
				<div className="flex h-[50px] items-center border-b border-slate-200 px-4 text-sm">
					{itemData.label}
				</div>
			)}
		</VirtualList>
	),
	play: async ({ canvas, step, args }) => {
		const { dataTestid = 'virtual-list-default' } = args;
		const container = canvas.getByTestId(dataTestid as string);
		const header = canvas.getByTestId('header');

		await step('Header is visible initially', async () => {
			expect(header).toBeVisible();
		});

		await step('Scroll down and verify header remains visible', async () => {
			container.scrollTop = 1000;
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
	render: (args) => (
		<VirtualList
			{...args}
			header={
				<div
					data-testid="header"
					className="border-b border-amber-200 bg-amber-100 p-4 font-bold text-amber-900"
				>
					Static Header (Scrolls Away)
				</div>
			}
		>
			{({ itemData }) => (
				<div className="flex h-[50px] items-center border-b border-slate-200 px-4">
					{itemData.label}
				</div>
			)}
		</VirtualList>
	)
};

export const StaticFooter: Story = {
	args: {
		items: generateItems(20),
		estimateSize: () => 50
	},
	render: (args) => (
		<VirtualList
			{...args}
			footer={
				<div
					data-testid="footer"
					className="bg-indigo-100 p-4 text-center font-bold text-indigo-900"
				>
					Reached the bottom!
				</div>
			}
		>
			{({ itemData }) => (
				<div className="flex h-[50px] items-center border-b border-slate-200 px-4">
					{itemData.label}
				</div>
			)}
		</VirtualList>
	),
	play: async ({ canvas, step, args }) => {
		const { dataTestid = 'virtual-list-default' } = args;
		const container = canvas.getByTestId(dataTestid as string);
		const footer = canvas.getByTestId('footer');

		await step('Scroll down to check if footer becomes visible', async () => {
			container.scrollTop = container.scrollHeight;
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
		stickyHeader: true,
		className: 'w-full h-32 overflow-auto border border-gray-200'
	},
	render: (args) => (
		<VirtualList
			{...args}
			header={
				<div
					data-testid="header"
					className="flex h-full w-max items-center whitespace-nowrap border-r border-blue-200 bg-blue-50 px-6 font-bold text-blue-800"
				>
					Start of List ⮕
				</div>
			}
		>
			{({ itemData }) => (
				<div className="flex h-full w-[120px] items-center justify-center border-r border-slate-200 text-sm">
					{itemData.label}
				</div>
			)}
		</VirtualList>
	)
};
