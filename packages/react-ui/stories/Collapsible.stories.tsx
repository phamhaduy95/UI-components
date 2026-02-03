import type { Meta, StoryObj } from '@storybook/react-vite';
import Collapsible from '@components/Collapsible';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';

const meta: Meta<typeof Collapsible> = {
	title: 'Components/Collapsible',
	component: Collapsible,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onOpenChange: { action: 'onOpenChange' }
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default collapsible component.
 */
export const Default: Story = {
	args: {
		Trigger: ({ open }) => (
			<div className="flex cursor-pointer items-center justify-between rounded-md bg-gray-100 p-3">
				<span>Click to toggle</span>
				<ChevronDownIcon
					className={classNames(
						'transition-transform duration-200',
						open ? 'rotate-180' : 'rotate-0'
					)}
				/>
			</div>
		),
		children: (
			<div className="mt-1 rounded-md border border-gray-100 bg-gray-50 p-3">
				This is the collapsible content. It can contain any elements.
			</div>
		)
	}
};

/**
 * Collapsible that is open by default.
 */
export const DefaultOpen: Story = {
	args: {
		...Default.args,
		defaultOpen: true
	}
};

/**
 * Disabled collapsible.
 */
export const Disabled: Story = {
	args: {
		...Default.args,
		disabled: true
	}
};
