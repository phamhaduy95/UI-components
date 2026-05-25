import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { SingleSlider } from '@components/SingleSlider';
import { Button } from '@components/Button';
import { ref } from 'vue';
import { expect, within, userEvent, fn } from 'storybook/test';

const mockedOnModelValueUpdate = fn();
const mockedOnValueChange = fn();
const mockedOnValueChangeEnd = fn();

const meta = {
	title: 'Components/FormField/Slider/SingleSlider',
	component: SingleSlider,
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
		},
		editable: {
			control: 'boolean'
		},
		numberInputWidth: {
			control: 'text'
		}
	},
	args: {
		label: 'Volume',
		supportingText: 'Please select a volume.',
		dataTestid: 'single-slider',
		editable: false,
		numberInputLabel: 'Volume Input',
		'onUpdate:modelValue': mockedOnModelValueUpdate,
		onValueChange: mockedOnValueChange,
		onValueChangeEnd: mockedOnValueChangeEnd
	},
	render: (args) => ({
		components: { SingleSlider },
		setup() {
			return { args };
		},
		template: '<div class="w-[300px]"><SingleSlider v-bind="args" /></div>'
	}),
	beforeEach() {
		mockedOnModelValueUpdate.mockClear();
		mockedOnValueChange.mockClear();
		mockedOnValueChangeEnd.mockClear();
	}
} satisfies Meta<typeof SingleSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas, args, step }) => {
		const { dataTestid = 'single-slider', label = '', supportingText = '' } = args;

		const container = canvas.getByTestId(dataTestid);
		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if slider exists', async () => {
			const slider = within(container).getByRole('slider', { name: label });
			expect(slider).toBeInTheDocument();
		});

		await step('Check if number input is NOT rendered', async () => {
			const input = container.querySelector('input[type="number"], [role="spinbutton"]');
			expect(input).not.toBeInTheDocument();
		});

		await step('Check if slider has supporting text', async () => {
			const slider = within(container).getByRole('slider', { name: label });

			expect(slider).toHaveAttribute('aria-describedby');

			const supportingTextId = slider.getAttribute('aria-describedby');
			if (supportingTextId) {
				const supportingTextEl = container.querySelector(`#${supportingTextId}`);
				expect(supportingTextEl).toHaveTextContent(supportingText);
			}
		});
	}
};

export const Editable: Story = {
	args: {
		label: 'Editable Slider',
		editable: true,
		defaultValue: 25
	},
	play: async ({ canvas, args, step }) => {
		const { dataTestid = 'single-slider', numberInputLabel = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if slider exists', async () => {
			const slider = within(container).getByRole('slider');
			expect(slider).toBeInTheDocument();
		});

		await step('Check if number input exists', async () => {
			const input = within(container).getByRole('spinbutton', { name: numberInputLabel });
			expect(input).toBeInTheDocument();
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Volume',
		defaultValue: 50,
		editable: true
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', numberInputLabel = '' } = args;

		const container = canvas.getByTestId(dataTestid);

		await step('Check if slider exists', async () => {
			const slider = within(container).getByRole('slider');
			expect(slider).toBeInTheDocument();
			expect(slider).toHaveAttribute('aria-valuenow', '50');
		});

		await step('Check if number input reflects default value', () => {
			const input = within(container).getByRole('spinbutton', { name: numberInputLabel });
			expect(input).toBeInTheDocument();
			expect(input).toHaveValue('50');
		});
	}
};

export const Controllable: Story = {
	args: {
		modelValue: 25,
		editable: true
	},
	render: (args) => ({
		components: { SingleSlider },
		setup() {
			const { 'onUpdate:modelValue': onModelValueUpdate, modelValue } = args;

			const value = ref(modelValue);

			const handleValueChange = (val: number) => {
				if (onModelValueUpdate) onModelValueUpdate(val);
				value.value = val;
			};
			return () => (
				<div class="w-[300px]">
					<SingleSlider
						{...args}
						modelValue={value.value}
						onUpdate:modelValue={handleValueChange}
					/>
					<p class="mt-3" aria-label="Displayed value">
						Value: {value.value}
					</p>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', numberInputLabel = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		const slider = within(container).getByRole('slider');
		const input = within(container).getByRole('spinbutton', { name: numberInputLabel });

		await step('Check if slider and input display initial value', async () => {
			expect(slider).toHaveAttribute('aria-valuenow', '25');
			expect(input).toHaveValue('25');
		});

		await step('Update slider value using keyboard arrows', async () => {
			slider.focus();
			await userEvent.keyboard('{ArrowRight}');
		});

		await step('Check if onUpdate:modelValue is called', async () => {
			expect(mockedOnModelValueUpdate).toHaveBeenCalledWith(26);
		});

		await step('Check if input is updated after sliding', () => {
			expect(input).toHaveValue('26');
		});

		await step('Update value using number input', async () => {
			await userEvent.clear(input);
			await userEvent.type(input, '50');
			input.blur();
		});

		await step('Check if slider is updated from input', async () => {
			expect(slider).toHaveAttribute('aria-valuenow', '50');
			expect(mockedOnModelValueUpdate).toHaveBeenCalledWith(50);
		});
	}
};

export const FloatNumber: Story = {
	args: {
		label: 'Float Number',
		defaultValue: 0.5,
		min: 0,
		max: 1,
		step: 0.1,
		editable: true
	},
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', numberInputLabel = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if slider exists and has float value', async () => {
			const slider = within(container).getByRole('slider');
			expect(slider).toBeInTheDocument();
			expect(slider).toHaveAttribute('aria-valuenow', '0.5');
		});

		await step('Check maxCharCount for 0 to 1 with 0.1 step (3ch)', async () => {
			const numberInput = container.querySelector('.SingleSlider_NumberInput');
			expect(numberInput).toHaveStyle({ '--slider-input-char-count': '3ch' });
		});

		await step('Check if number input reflects float value', () => {
			const input = within(container).getByRole('spinbutton', { name: numberInputLabel });
			expect(input).toBeInTheDocument();
			expect(input).toHaveValue('0.5');
		});

		await step('Update float value using number input', async () => {
			const input = within(container).getByRole('spinbutton', { name: numberInputLabel });
			await userEvent.clear(input);
			await userEvent.type(input, '0.8');
			input.blur();
		});

		await step('Check if slider is updated from float input', async () => {
			const slider = within(container).getByRole('slider');
			expect(slider).toHaveAttribute('aria-valuenow', '0.8');
		});
	}
};

export const MaxCharCountCases: Story = {
	render: () => ({
		components: { SingleSlider },
		setup() {
			return () => (
				<div class="flex flex-col gap-2 w-[300px]">
					<SingleSlider
						label="High Precision"
						editable
						min={0}
						max={1}
						step={0.001}
						defaultValue={0.5}
					/>
					<SingleSlider
						label="Negative Float"
						editable
						min={-100.5}
						max={100}
						step={0.5}
						defaultValue={-50.5}
					/>
					<SingleSlider
						label="Large Integer"
						editable
						min={-1000}
						max={1000}
						step={1}
						defaultValue={0}
					/>
				</div>
			);
		}
	})
};

export const CustomSlots: Story = {
	args: {
		label: 'Custom Slots',
		supportingText: 'This slider uses custom slots',
		defaultValue: 25,
		dataTestid: 'custom-slots-slider'
	},
	render: (args) => ({
		components: { SingleSlider },
		setup() {
			return () => (
				<div class="w-[400px]">
					<SingleSlider {...args}>
						{{
							label: ({ label, value }: { label: string; value: number[] }) => (
								<div class="flex items-center justify-between w-full mb-2">
									<strong class="text-blue-600 font-bold">{label}</strong>
									<span class="text-xs font-mono bg-blue-100 text-blue-800 py-1 px-2 rounded">
										Label Value: {value[0]}
									</span>
								</div>
							),

							supportingText: ({ supportingText }: { supportingText: string }) => (
								<em class="text-gray-500 italic mt-2 block">{supportingText}</em>
							),
							trailing: ({ setValue }: { setValue: (val: number[]) => void }) => (
								<Button
									class="ml-4"
									size="sm"
									onClick={() => setValue([100])}
									data-testid="max-button"
								>
									Go to max
								</Button>
							)
						}}
					</SingleSlider>
				</div>
			);
		}
	}),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const container = canvas.getByTestId('custom-slots-slider');

		await step('Check custom label slot', async () => {
			const labelText = within(container).getByText('Custom Slots');
			expect(labelText).toHaveClass('text-blue-600');
			expect(within(container).getByText('Label Value: 25')).toBeInTheDocument();
		});

		await step('Check custom supportingText slot', async () => {
			const supportText = within(container).getByText('This slider uses custom slots');
			expect(supportText).toBeInTheDocument();
		});

		await step('Check custom trailing slot behavior', async () => {
			const maxBtn = within(container).getByTestId('max-button');
			expect(maxBtn).toBeInTheDocument();
			expect(maxBtn).toHaveTextContent('Go to max');

			const slider = within(container).getByRole('slider');
			expect(slider).toHaveAttribute('aria-valuenow', '25');

			await userEvent.click(maxBtn);

			expect(slider).toHaveAttribute('aria-valuenow', '100');
			expect(maxBtn).toHaveTextContent('Go to max');
			expect(within(container).getByText('Label Value: 100')).toBeInTheDocument();
		});
	}
};

export const FixedInputWidth: Story = {
	render: () => ({
		components: { SingleSlider },
		setup() {
			const numberInputWidth = '8ch';

			return () => (
				<section class="flex flex-col gap-2 w-[300px]">
					<h1>Fixed Width Input</h1>
					<SingleSlider
						data-testid="slider-fixed-1"
						label="Short Char Count"
						editable
						min={0}
						max={10}
						step={1}
						defaultValue={5}
						numberInputWidth={numberInputWidth}
					/>
					<SingleSlider
						data-testid="slider-fixed-2"
						label="Medium Char Count"
						editable
						min={-100}
						max={100}
						step={0.5}
						defaultValue={50}
						numberInputWidth={numberInputWidth}
					/>
					<SingleSlider
						data-testid="slider-fixed-3"
						label="Long Char Count"
						editable
						min={-1000}
						max={1000}
						step={0.001}
						defaultValue={50}
						numberInputWidth={numberInputWidth}
					/>
				</section>
			);
		}
	})
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Slider',
		disabled: true,
		defaultValue: 50,
		editable: true
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', numberInputLabel = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if slider is disabled', async () => {
			const slider = within(container).getByRole('slider');
			expect(slider).toHaveAttribute('aria-disabled', 'true');
		});

		await step('Check if number input is disabled', async () => {
			const input = within(container).getByRole('spinbutton', { name: numberInputLabel });
			expect(input).toBeDisabled();
		});
	}
};
