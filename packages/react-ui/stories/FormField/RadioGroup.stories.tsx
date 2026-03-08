import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { RadioGroup } from '@components/RadioGroup';

import type { Meta, StoryObj } from '@storybook/react-vite';

const mockedOnValueChange = fn();

const meta: Meta<typeof RadioGroup> = {
	title: 'Components/FormField/RadioGroup',
	component: RadioGroup,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		onValueChange: { action: 'onValueChange' },
		disabled: { control: 'boolean' },
		required: { control: 'boolean' }
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

const defaultItems = [
	{ text: 'React', value: 'react' },
	{ text: 'Vue', value: 'vue' },
	{ text: 'Angular', value: 'angular' }
];

export const Default: Story = {
	args: {
		label: 'Framework',
		items: defaultItems,
		'data-testid': 'radio-group-default'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if container and label exist', async () => {
			expect(container).toBeInTheDocument();
			expect(within(container).getByText('Framework')).toBeInTheDocument();
		});

		const reactRadio = within(container).getByLabelText('React');
		const vueRadio = within(container).getByLabelText('Vue');
		const angularRadio = within(container).getByLabelText('Angular');

		await step('Initial state: nothing selected', async () => {
			expect(reactRadio).not.toBeChecked();
			expect(vueRadio).not.toBeChecked();
			expect(angularRadio).not.toBeChecked();
		});

		await step('Click React and verify selection', async () => {
			await userEvent.click(reactRadio);
			expect(reactRadio).toBeChecked();
			expect(vueRadio).not.toBeChecked();
			expect(angularRadio).not.toBeChecked();
		});

		await step('Click Vue and verify selection changes', async () => {
			await userEvent.click(vueRadio);
			expect(vueRadio).toBeChecked();
			expect(reactRadio).not.toBeChecked();
			expect(angularRadio).not.toBeChecked();
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Framework',
		items: defaultItems,
		defaultValue: 'vue',
		'data-testid': 'radio-group-default-value'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);
		const vueRadio = within(container).getByLabelText('Vue');

		await step('Check if Vue is initially checked', async () => {
			expect(vueRadio).toBeChecked();
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Framework',
		items: defaultItems,
		disabled: true,
		'data-testid': 'radio-group-disabled'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);
		const radios = within(container).getAllByRole('radio');

		await step('Check if all radios are disabled', async () => {
			radios.forEach((radio) => {
				expect(radio).toBeDisabled();
			});
		});
	}
};

export const IndividualDisabled: Story = {
	args: {
		label: 'Framework',
		items: [
			{ text: 'React', value: 'react' },
			{ text: 'Vue', value: 'vue', disabled: true },
			{ text: 'Angular', value: 'angular' }
		],
		'data-testid': 'radio-group-individual-disabled'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);
		const vueRadio = within(container).getByLabelText('Vue');
		const reactRadio = within(container).getByLabelText('React');

		await step('Check if Vue is disabled but React is not', async () => {
			expect(vueRadio).toBeDisabled();
			expect(reactRadio).not.toBeDisabled();
		});
	}
};

export const Controlled: Story = {
	args: {
		label: 'Framework',
		items: defaultItems,
		onValueChange: mockedOnValueChange,
		'data-testid': 'radio-group-controlled'
	},
	render(args) {
		const [value, setValue] = useState<string>('');

		const handleValueChange = (value: string) => {
			if (args.onValueChange) args.onValueChange(value);
			setValue(value);
		};

		return (
			<div className="flex flex-col gap-4">
				<RadioGroup {...args} value={value} onValueChange={handleValueChange} />
				<p aria-label="Selected value">Selected: {value}</p>
			</div>
		);
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);
		const angularRadio = within(container).getByLabelText('Angular');

		await step('Initial display empty', async () => {
			const selectedText = canvas.getByLabelText('Selected value');
			expect(selectedText).toHaveTextContent('Selected:');
		});

		await step('Select Angular and verify state update', async () => {
			await userEvent.click(angularRadio);
		});

		await step('Check if onCheckedValue is trigger', async () => {
			expect(mockedOnValueChange).toHaveBeenLastCalledWith('angular');
		});

		await step('Check if displayed value is updated', async () => {
			const selectedText = canvas.getByLabelText('Selected value');
			expect(selectedText).toHaveTextContent('Selected: angular');
		});
	}
};

export const Required: Story = {
	args: {
		label: 'Framework',
		items: defaultItems,
		required: true,
		'data-testid': 'radio-group-required'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);
		const radios = within(container).getAllByRole('radio');

		await step('Check if radios are required', async () => {
			radios.forEach((radio) => {
				expect(radio).toBeRequired();
			});
		});
	}
};
