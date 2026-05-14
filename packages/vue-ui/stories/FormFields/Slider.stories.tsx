import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Slider } from '@components/BaseSlider';
import { ref } from 'vue';
import { expect, within, userEvent, fn } from 'storybook/test';

const mockedOnModelValueUpdate = fn();
const mockedOnValueChange = fn();
const mockedOnValueChangeEnd = fn();

const SLIDER_TEXT_LABEL_TEST_ID = 'slider-value-text';
const SLIDER_MARKER_GROUP_TEST_ID = 'slider-marker-group';

const meta = {
	title: 'Components/FormField/Slider',
	component: Slider,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		'onUpdate:modelValue': { action: 'update:modelValue' },
		onValueChange: { action: 'valueChange' },
		onValueChangeEnd: { action: 'valueChangeEnd' },
		color: {
			control: 'select',
			options: ['primary', 'secondary', 'success', 'error', 'warning']
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large']
		},

		disabled: {
			control: 'boolean'
		}
	},
	args: {
		label: 'Volume',
		supportingText: 'Please select a volume.',
		dataTestid: 'slider',
		'onUpdate:modelValue': mockedOnModelValueUpdate,
		onValueChange: mockedOnValueChange,
		onValueChangeEnd: mockedOnValueChangeEnd
	},
	render: (args) => ({
		components: { Slider },
		setup() {
			return { args };
		},
		template: '<div style="width: 300px;"><Slider v-bind="args" /></div>'
	}),
	beforeEach() {
		mockedOnModelValueUpdate.mockClear();
		mockedOnValueChange.mockClear();
		mockedOnValueChangeEnd.mockClear();
	}
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas, args, step }) => {
		const { dataTestid = 'slider', label = '', supportingText = '' } = args;

		const container = canvas.getByTestId(dataTestid);
		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if slider exists', async () => {
			const slider = within(container).getByRole('slider', { name: label });
			expect(slider).toBeInTheDocument();
		});

		await step('Check if textValue is displayed', () => {
			const textValue = within(container).getByTestId(SLIDER_TEXT_LABEL_TEST_ID);
			expect(textValue).toBeInTheDocument();
			expect(textValue).toHaveTextContent('0');
		});

		await step('Check if slider has supporting text', async () => {
			const slider = within(container).getByRole('slider', { name: label });

			expect(slider).toHaveAttribute('aria-describedby');

			const supportingTextId = slider.getAttribute('aria-describedby');

			const supportingTextEl = container.querySelector(`#${supportingTextId}`);

			expect(supportingTextEl).toHaveTextContent(supportingText);
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Volume',
		defaultValue: [50]
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if slider exists', async () => {
			const slider = within(container).getByRole('slider');
			expect(slider).toBeInTheDocument();
			expect(slider).toHaveAttribute('aria-valuenow', '50');
		});

		await step('Check if textValue is displayed', () => {
			const textValue = within(container).getByTestId(SLIDER_TEXT_LABEL_TEST_ID);
			expect(textValue).toBeInTheDocument();
			expect(textValue).toHaveTextContent('50');
		});
	}
};

export const Controllable: Story = {
	args: {
		modelValue: [25]
	},
	render: (args) => ({
		components: { Slider },
		setup() {
			const { 'onUpdate:modelValue': onModelValueUpdate, modelValue } = args;

			const value = ref(modelValue);

			const handleValueChange = (val: number[]) => {
				if (onModelValueUpdate) onModelValueUpdate(val);
				value.value = val;
			};
			return () => (
				<div style="width: 300px;">
					<Slider {...args} modelValue={value.value} onUpdate:modelValue={handleValueChange} />
					<p style="margin-top: 12px;" aria-label="Displayed value">
						Value: {value.value?.join(', ')}
					</p>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		const slider = within(container).getByRole('slider');
		await step('Check if slider displays initial value', async () => {
			expect(slider).toHaveAttribute('aria-valuenow', '25');
		});

		await step('Update slider value using keyboard arrows', async () => {
			slider.focus();
			await userEvent.keyboard('{ArrowRight}');
		});

		await step('Check if onUpdate:modelValue is called', async () => {
			expect(mockedOnModelValueUpdate).toHaveBeenCalledWith([26]);
		});

		await step('Check if textValue is updated', () => {
			const textValue = within(container).getByTestId(SLIDER_TEXT_LABEL_TEST_ID);
			expect(textValue).toHaveTextContent('26');
		});
	}
};

export const RangeSlider: Story = {
	args: {
		label: 'Price Range',
		defaultValue: [20, 80]
	},
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if there are multiple slider thumbs', async () => {
			const sliders = within(container).getAllByRole('slider');
			expect(sliders).toHaveLength(2);
			expect(sliders[0]).toHaveAttribute('aria-valuenow', '20');
			expect(sliders[1]).toHaveAttribute('aria-valuenow', '80');
		});
	}
};

export const RangeWithCustomValueText: Story = {
	args: {
		label: 'Price Range',
		defaultValue: [20, 80],
		dataTestid: 'slider-range-custom-value'
	},
	render: (args) => ({
		components: { Slider },
		setup() {
			return { args };
		},
		template: `
			<div style="width: 300px;">
				<Slider v-bind="args">
					<template #valueText="{ value }">
						<span data-testid="custom-value-text">
							\${{ value[0] }} - \${{ value[1] }}
						</span>
					</template>
				</Slider>
			</div>
		`
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if custom value text is rendered', async () => {
			const valueText = within(container).getByTestId('custom-value-text');
			expect(valueText).toHaveTextContent('$20 - $80');
		});
	}
};

const MARK_POINTS = [0, 25, 50, 75, 100];

export const WithMarks: Story = {
	args: {
		label: 'Percentage',
		defaultValue: [50],
		marks: MARK_POINTS
	},
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if marks are rendered', async () => {
			const markGroup = within(container).getByTestId(SLIDER_MARKER_GROUP_TEST_ID);

			MARK_POINTS.forEach((mark) => {
				expect(within(markGroup).getByText(mark.toString())).toBeInTheDocument();
			});
		});
	}
};

const CUSTOM_MARK_POINTS = [
	{ value: 0, label: 'Min' },
	{ value: 25, label: '25%' },
	{ value: 50, label: 'Middle' },
	{ value: 75, label: '75%' },
	{ value: 100, label: 'Max' }
];

export const WithCustomMarks: Story = {
	args: {
		label: 'Custom Marks',
		defaultValue: [50],
		marks: CUSTOM_MARK_POINTS,
		dataTestid: 'slider-custom-marks'
	},
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if custom marks are rendered', async () => {
			const markGroup = within(container).getByTestId(SLIDER_MARKER_GROUP_TEST_ID);

			CUSTOM_MARK_POINTS.forEach((mark) => {
				expect(within(markGroup).getByText(mark.label)).toBeInTheDocument();
			});
		});
	}
};

export const BlankSlider: Story = {
	args: {
		label: undefined,
		supportingText: undefined,
		'aria-label': 'Volume'
	},
	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const { dataTestid = '' } = args;

		const container = canvas.getByTestId(dataTestid);

		await step('Check if slider does not have label', async () => {
			const label = container.querySelector('label');
			expect(label).not.toBeInTheDocument();
		});

		await step('Check if slider does not have supporting text', async () => {
			const slider = within(container).getByRole('slider');
			expect(slider).not.toHaveAttribute('aria-describedby');
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Slider',
		disabled: true,
		defaultValue: [50]
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if slider is disabled', async () => {
			const slider = within(container).getByRole('slider');
			expect(slider).toHaveAttribute('aria-disabled', 'true');
		});
	}
};

export const Required: Story = {
	args: {
		label: 'Required Slider',
		required: true
	},

	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if slider is required', async () => {
			// Slider thumb uses aria-orientation but BaseField sets data-required
			const baseField = container.querySelector('.BaseField');
			expect(baseField).toHaveAttribute('data-required', 'true');
		});
	}
};

export const Sizes: Story = {
	render: () => ({
		components: { Slider },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 32px; width: 300px;">
					<Slider label="Small" size="small" defaultValue={[20]} />
					<Slider label="Medium" size="medium" defaultValue={[50]} />
					<Slider label="Large" size="large" defaultValue={[80]} />
				</div>
			);
		}
	})
};

export const Color: Story = {
	render: () => ({
		components: { Slider },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 32px; width: 300px;">
					<Slider label="Primary Status" color="primary" defaultValue={[50]} />
					<Slider label="Secondary Status" color="secondary" defaultValue={[60]} />
					<Slider label="Success Status" color="success" defaultValue={[70]} />
					<Slider label="Warning Status" color="warning" defaultValue={[80]} />
					<Slider label="Error Status" color="error" defaultValue={[90]} />
				</div>
			);
		}
	})
};
