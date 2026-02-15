import type { Meta, StoryObj } from '@storybook/react-vite';
import Tag from '@components/Tag';
import { fn } from 'storybook/test';

const meta: Meta<typeof Tag> = {
	title: 'Components/DataDisplay/Tag',
	component: Tag,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'success', 'warning', 'error', 'outlined']
		},
		size: {
			control: 'select',
			options: ['default', 'small']
		},
		onRemoveClick: { action: 'removed' }
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Tag Label',
		variant: 'primary'
	}
};

export const Variant: Story = {
	render: () => {
		return (
			<div className="flex gap-2">
				<Tag label="Primary" variant="primary" />
				<Tag label="Secondary" variant="secondary" />
				<Tag label="Success" variant="success" />
				<Tag label="Warning" variant="warning" />
				<Tag label="Error" variant="error" />
				<Tag label="Outlined" variant="outlined" />
			</div>
		);
	}
};

export const Size: Story = {
	render: () => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-2">
					<Tag label="Default size" size="default" />
					<Tag label="Default size" size="default" variant="secondary" />
				</div>
				<div className="flex items-center gap-2">
					<Tag label="Small size" size="small" />
					<Tag label="Small size" size="small" variant="secondary" />
				</div>
			</div>
		);
	}
};

export const Removable: Story = {
	args: {
		label: 'Removable Tag',
		removable: true,
		onRemoveClick: fn()
	}
};

export const RemovableVariants: Story = {
	render: () => {
		return (
			<div className="flex gap-2">
				<Tag label="Primary" variant="primary" removable />
				<Tag label="Secondary" variant="secondary" removable />
				<Tag label="Success" variant="success" removable />
				<Tag label="Warning" variant="warning" removable />
				<Tag label="Error" variant="error" removable />
				<Tag label="Outlined" variant="outlined" removable />
			</div>
		);
	}
};
