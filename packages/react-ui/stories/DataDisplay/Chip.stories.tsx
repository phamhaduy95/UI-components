import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from '@components/Chip';
import { expect, fn, userEvent, within } from 'storybook/test';

const mockedOnRemove = fn();
const mockedOnClick = fn();

const meta: Meta<typeof Chip> = {
	title: 'Components/DataDisplay/Chip',
	component: Chip,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		color: {
			control: 'select',
			options: ['primary', 'secondary', 'success', 'warning', 'error', 'default']
		},
		size: {
			control: 'select',
			options: ['default', 'small']
		},
		onRemove: { action: 'removed' }
	},
	args: {
		onRemove: mockedOnRemove,
		onClick: mockedOnClick
	},
	beforeEach: () => {
		mockedOnRemove.mockClear();
		mockedOnClick.mockClear();
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Tag Label'
	}
};

export const ColorVariants: Story = {
	render: () => {
		return (
			<div className="flex flex-col gap-4">
				<div>
					<p className="mb-2">Non-Interactable</p>
					<div className="flex gap-2">
						<Chip label="Primary" color="primary" />
						<Chip label="Secondary" color="secondary" />
						<Chip label="Success" color="success" />
						<Chip label="Warning" color="warning" />
						<Chip label="Error" color="error" />
					</div>
				</div>
				<div>
					<p className="mb-2">Clickable</p>
					<div className="flex gap-2">
						<Chip label="Primary" color="primary" clickable />
						<Chip label="Secondary" color="secondary" clickable />
						<Chip label="Success" color="success" clickable />
						<Chip label="Warning" color="warning" clickable />
						<Chip label="Error" color="error" clickable />
					</div>
				</div>
				<div>
					<p className="mb-2">Removeable</p>
					<div className="flex gap-2">
						<Chip label="Primary" color="primary" removable />
						<Chip label="Secondary" color="secondary" removable />
						<Chip label="Success" color="success" removable />
						<Chip label="Warning" color="warning" removable />
						<Chip label="Error" color="error" removable />
					</div>
				</div>
			</div>
		);
	}
};

export const Clickable: Story = {
	render: (args) => {
		const { onClick } = args;
		return <Chip label="Clickable Tag" clickable onClick={onClick} />;
	},
	async play({ step, canvas }) {
		const chip = canvas.getByRole('button', { name: 'Clickable Tag' });

		await step('Click on Chip', async () => {
			await userEvent.click(chip);
		});

		await step('Check if onclick is invoked', async () => {
			expect(mockedOnClick).toHaveBeenCalled();
		});
	}
};

export const Size: Story = {
	render: () => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-2">
					<Chip label="Default size" size="medium" />
					<Chip label="Default size" size="medium" color="secondary" />
				</div>
				<div className="flex items-center gap-2">
					<Chip label="Small size" size="small" />
					<Chip label="Small size" size="small" color="secondary" />
				</div>
			</div>
		);
	}
};

export const Removable: Story = {
	args: {
		label: 'Removable Tag',
		removable: true,
		'data-testid': 'chip-remove-button'
	},
	play: async ({ args, canvas, step }) => {
		const { 'data-testid': dataTestId = '' } = args;

		const chip = canvas.getByTestId(dataTestId);

		const removeButton = within(chip).getByRole('button');

		await step('Click on Remove icon', async () => {
			await userEvent.click(removeButton);
		});

		await step('Check if onRemove is called', async () => {
			expect(mockedOnRemove).toHaveBeenCalled();
		});

		await step('Focus on Chip and press Delete', async () => {
			await userEvent.keyboard('{delete}');
		});

		await step('Check if onRemove is called', async () => {
			expect(mockedOnRemove).toHaveBeenCalled();
		});

		await step('Focus on Chip and press Backspace', async () => {
			await userEvent.keyboard('{backspace}');
		});

		await step('Check if onRemove is called', async () => {
			expect(mockedOnRemove).toHaveBeenCalled();
		});
	}
};

export const RemovableVariants: Story = {
	render: () => {
		return (
			<div className="flex gap-2">
				<Chip label="Primary" color="primary" removable />
				<Chip label="Secondary" color="secondary" removable />
				<Chip label="Success" color="success" removable />
				<Chip label="Warning" color="warning" removable />
				<Chip label="Error" color="error" removable />
			</div>
		);
	}
};
