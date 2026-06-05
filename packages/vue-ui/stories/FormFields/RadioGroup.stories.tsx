import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { RadioGroup } from '@components/RadioGroup';
import { fn, expect, within } from 'storybook/test';

const mockedOnValueChange = fn();
const mockedOnUpdateModelValue = fn();

const meta = {
	title: 'Components/FormField/RadioGroup',
	component: RadioGroup,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		'onUpdate:modelValue': { action: 'update:modelValue' },
		onValueChange: { action: 'valueChange' },
		status: {
			control: 'select',
			options: ['default', 'error', 'success', 'warning']
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		orientation: {
			control: 'select',
			options: ['vertical', 'horizontal']
		},
		disabled: {
			control: 'boolean'
		},
		readonly: {
			control: 'boolean'
		}
	},
	args: {
		dataTestid: 'radio-group',
		onValueChange: mockedOnValueChange,
		'onUpdate:modelValue': mockedOnUpdateModelValue,
		options: [
			{ label: 'Option A', value: 'a' },
			{ label: 'Option B', value: 'b' },
			{ label: 'Option C', value: 'c' }
		]
	},
	render: (args) => ({
		components: { RadioGroup },
		setup() {
			return { args };
		},
		template: '<RadioGroup v-bind="args" />'
	}),
	beforeEach() {
		mockedOnValueChange.mockClear();
		mockedOnUpdateModelValue.mockClear();
	}
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Choose an option'
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const container = canvas.getByTestId('radio-group');

		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});
	}
};

export const Horizontal: Story = {
	args: {
		label: 'Horizontal Orientation',
		orientation: 'horizontal'
	}
};

export const DisabledOption: Story = {
	args: {
		label: 'Disabled Option',
		options: [
			{ label: 'Option A', value: 'a' },
			{ label: 'Option B', value: 'b', disabled: true },
			{ label: 'Option C', value: 'c' }
		]
	}
};

export const DisabledGroup: Story = {
	args: {
		label: 'Disabled Group',
		disabled: true
	}
};

export const Sizes: Story = {
	render: () => ({
		components: { RadioGroup },
		setup() {
			return () => (
				<div style="display: flex; gap: 32px;">
					<RadioGroup
						label="Small Radio"
						size="sm"
						defaultValue="a"
						options={[
							{ label: 'Option A', value: 'a' },
							{ label: 'Option B', value: 'b' }
						]}
					/>
					<RadioGroup
						label="Medium Radio"
						size="md"
						defaultValue="a"
						options={[
							{ label: 'Option A', value: 'a' },
							{ label: 'Option B', value: 'b' }
						]}
					/>
					<RadioGroup
						label="Large Radio"
						size="lg"
						defaultValue="a"
						options={[
							{ label: 'Option A', value: 'a' },
							{ label: 'Option B', value: 'b' }
						]}
					/>
				</div>
			);
		}
	})
};
