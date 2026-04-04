import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Pagination } from '@components/Pagination';
import { ref } from 'vue';
import { expect, within, userEvent, fn } from 'storybook/test';

const mockedOnPageChange = fn();
const mockedOnUpdatePage = fn();

const nextTriggerLabel = 'next page';
const prevTriggerLabel = 'previous page';
const firstTriggerLabel = 'first page';
const lastTriggerLabel = 'last page';

const getPageButtonLabelName = (page: number, isLast: boolean = false) =>
	isLast ? `last page, page ${page}` : `page ${page}`;

const meta = {
	title: 'Components/DataDisplay/Pagination',
	component: Pagination,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onPageChange: { action: 'pageChange' },
		'onUpdate:page': { action: 'update:page' }
	},
	args: {
		onPageChange: mockedOnPageChange,
		'onUpdate:page': mockedOnUpdatePage
	},
	beforeEach() {
		mockedOnPageChange.mockClear();
		mockedOnUpdatePage.mockClear();
	}
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		count: 100,
		siblingCount: 0,
		dataTestid: 'pagination-default'
	},
	render: (args) => ({
		components: { Pagination },
		setup() {
			return { args };
		},
		template: '<Pagination v-bind="args" />'
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check container is rendered', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check prev/next triggers are rendered', async () => {
			const nextBtn = within(container).getByRole('button', { name: nextTriggerLabel });
			const prevBtn = within(container).getByRole('button', { name: prevTriggerLabel });
			expect(nextBtn).toBeInTheDocument();
			expect(prevBtn).toBeInTheDocument();
		});

		await step('Check page 1 is selected by default', async () => {
			const label = getPageButtonLabelName(1);
			const page1 = within(container).getByRole('button', { name: label });
			expect(page1).toHaveAttribute('data-selected');
		});

		await step('Check if previous button is disabled when page is 1', async () => {
			const prevBtn = within(container).getByRole('button', { name: prevTriggerLabel });
			expect(prevBtn).toBeDisabled();
		});
	}
};

export const DefaultPage: Story = {
	args: {
		count: 100,
		defaultPage: 3,
		dataTestid: 'pagination-default-page'
	},
	render: (args) => ({
		components: { Pagination },
		setup() {
			return { args };
		},
		template: '<Pagination v-bind="args" />'
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check page 3 is selected when defaultPage is 3', async () => {
			const page3Label = getPageButtonLabelName(3);
			const page3 = within(container).getByRole('button', { name: page3Label });
			expect(page3).toHaveAttribute('data-selected');
		});
	}
};

export const WithFirstAndLastTriggers: Story = {
	args: {
		count: 100,
		showFirstTrigger: true,
		showLastTrigger: true,
		dataTestid: 'pagination-first-last'
	},
	render: (args) => ({
		components: { Pagination },
		setup() {
			return { args };
		},
		template: '<Pagination v-bind="args" />'
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if first and last triggers are rendered', async () => {
			const firstBtn = within(container).getByRole('button', { name: firstTriggerLabel });
			const lastBtn = within(container).getByRole('button', { name: lastTriggerLabel });
			expect(firstBtn).toBeInTheDocument();
			expect(lastBtn).toBeInTheDocument();
		});

		await step('Click on last page button', async () => {
			const lastBtn = within(container).getByRole('button', { name: lastTriggerLabel });
			await userEvent.click(lastBtn);
		});

		await step('Check if last page is selected', async () => {
			const lastPageLabel = getPageButtonLabelName(10, true);
			const lastpage = within(container).getByRole('button', { name: lastPageLabel });
			expect(lastpage).toHaveAttribute('data-selected');
		});

		await step('Check if onPageChange callback fired with page 10', async () => {
			expect(mockedOnUpdatePage).toHaveBeenLastCalledWith(10);
		});

		await step('Click on first page button', async () => {
			const firstBtn = within(container).getByRole('button', { name: firstTriggerLabel });
			await userEvent.click(firstBtn);
		});

		await step('Check if first page is selected', async () => {
			const firstPageLabel = getPageButtonLabelName(1);
			const firstpage = within(container).getByRole('button', { name: firstPageLabel });
			expect(firstpage).toHaveAttribute('data-selected');
		});

		await step('Check if onPageChange callback fired with page 1', async () => {
			expect(mockedOnUpdatePage).toHaveBeenLastCalledWith(1);
		});
	}
};

export const Controllable: Story = {
	args: {
		count: 100,
		page: 1,
		dataTestid: 'pagination-controllable'
	},
	render: (args) => ({
		components: { Pagination },
		setup() {
			const currentPage = ref(args.page ?? 1);

			const handlePageChange = ({ page }: { page: number }) => {
				mockedOnPageChange({ page });
				currentPage.value = page;
			};

			const handleUpdatePage = (page: number) => {
				mockedOnUpdatePage(page);
				currentPage.value = page;
			};

			return () => (
				<div>
					<Pagination
						{...args}
						page={currentPage.value}
						onPageChange={handlePageChange}
						onUpdate:page={handleUpdatePage}
					/>
					<p style={{ marginTop: '16px' }} aria-label="Current page display">
						Current page: {currentPage.value}
					</p>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check initial page is 1', async () => {
			const page1 = within(container).getByRole('button', { name: getPageButtonLabelName(1) });
			expect(page1).toHaveAttribute('data-selected');
		});

		await step('Click page 2', async () => {
			const page2 = within(container).getByRole('button', { name: getPageButtonLabelName(2) });
			await userEvent.click(page2);
		});

		await step('Verify page change callbacks fired with page 2', async () => {
			expect(mockedOnPageChange).toHaveBeenLastCalledWith({ page: 2 });
			expect(mockedOnUpdatePage).toHaveBeenLastCalledWith(2);
		});

		await step('Check displayed page updated to 2', async () => {
			const display = canvas.getByLabelText('Current page display');
			expect(display).toHaveTextContent('Current page: 2');
		});

		await step('Click page 3', async () => {
			const page3 = within(container).getByRole('button', { name: getPageButtonLabelName(3) });
			await userEvent.click(page3);
		});

		await step('Check displayed page updated to 3', async () => {
			const page3 = within(container).getByRole('button', { name: getPageButtonLabelName(3) });
			expect(page3).toHaveAttribute('data-selected');
		});
	}
};

export const NavigateWithPrevNext: Story = {
	args: {
		count: 50,
		defaultPage: 2,
		dataTestid: 'pagination-prev-next'
	},
	render: (args) => ({
		components: { Pagination },
		setup() {
			return { args };
		},
		template: '<Pagination v-bind="args" />'
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Page 2 is selected initially', async () => {
			const page2 = within(container).getByRole('button', { name: getPageButtonLabelName(2) });
			expect(page2).toHaveAttribute('data-selected');
		});

		await step('Click next trigger to go to page 3', async () => {
			const nextBtn = within(container).getByRole('button', { name: nextTriggerLabel });
			await userEvent.click(nextBtn);
		});

		await step('Page 3 is now selected', async () => {
			const page3 = within(container).getByRole('button', { name: getPageButtonLabelName(3) });
			expect(page3).toHaveAttribute('data-selected');
		});

		await step('Click prev trigger to go back to page 2', async () => {
			const prevBtn = within(container).getByRole('button', { name: prevTriggerLabel });
			await userEvent.click(prevBtn);
		});

		await step('Page 2 is selected again', async () => {
			const page2 = within(container).getByRole('button', { name: getPageButtonLabelName(2) });
			expect(page2).toHaveAttribute('data-selected');
		});
	}
};

export const CustomSlots: Story = {
	args: {
		count: 60,
		showFirstTrigger: true,
		showLastTrigger: true,
		dataTestid: 'pagination-custom-slots'
	},
	render: (args) => ({
		components: { Pagination },
		setup() {
			return () => (
				<Pagination {...args}>
					{{
						firstTrigger: () => <span>«</span>,
						prevTrigger: () => <span>‹</span>,
						nextTrigger: () => <span>›</span>,
						lastTrigger: () => <span>»</span>
					}}
				</Pagination>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Custom prev trigger text is rendered', async () => {
			expect(within(container).getByText('‹')).toBeInTheDocument();
		});

		await step('Custom next trigger text is rendered', async () => {
			expect(within(container).getByText('›')).toBeInTheDocument();
		});

		await step('Custom first trigger text is rendered', async () => {
			expect(within(container).getByText('«')).toBeInTheDocument();
		});

		await step('Custom last trigger text is rendered', async () => {
			expect(within(container).getByText('»')).toBeInTheDocument();
		});
	}
};
