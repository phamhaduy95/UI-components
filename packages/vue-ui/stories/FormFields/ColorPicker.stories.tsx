import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ColorPicker } from '@components/ColorPicker';
import { ref } from 'vue';
import { expect, within, fn, userEvent, waitFor } from 'storybook/test';

const mockedOnModelValueUpdate = fn();

const colorPickerAreaThumbLabel = 'saturation and brightness';

const meta = {
	title: 'Components/FormField/ColorPicker',
	component: ColorPicker,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		'onUpdate:modelValue': { action: 'update:modelValue' },
		status: {
			control: 'select',
			options: ['default', 'error', 'success', 'warning']
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large']
		}
	},
	args: {
		label: 'Color',
		supportingText: 'Please select a color.',
		dataTestid: 'color-picker',
		'onUpdate:modelValue': mockedOnModelValueUpdate
	},
	render: (args) => ({
		components: { ColorPicker },
		setup() {
			return { args };
		},
		template: '<ColorPicker v-bind="args" />'
	}),
	beforeEach() {
		mockedOnModelValueUpdate.mockClear();
	}
} satisfies Meta<typeof ColorPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;

		const container = canvas.getByTestId(dataTestid);
		await step('Check if container exists', async () => {
			expect(container).toBeVisible();
		});

		await step('Check if label exists', async () => {
			const labelElement = canvas.getByText(label as string);
			expect(labelElement).toBeVisible();
		});

		await step('Check if trigger button exists', async () => {
			const trigger = canvas.getByRole('button', { name: label });
			expect(trigger).toBeVisible();
		});

		await step('Check if hidden input exists', async () => {
			const hiddenInput = within(container).getByRole('textbox', { name: label });
			expect(hiddenInput).toBeInTheDocument();
		});

		await step('Check if color swatch exists', async () => {
			const colorSwatch = container.querySelector('.ColorPicker_Swatch');
			expect(colorSwatch).toBeVisible();
		});

		await step('Check if color swatch is displayed', async () => {
			const transparencyGrid = container.querySelector('[data-part="transparency-grid"]');
			const valueSwatch = container.querySelector('[data-part="swatch"]');

			expect(transparencyGrid).toBeVisible();
			expect(valueSwatch).toBeVisible();
		});

		await step('Check if supporting text is displayed', async () => {
			const supportingText = within(container).getByText('Please select a color.');
			expect(supportingText).toBeVisible();
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Brand Color',
		defaultValue: '#00ff00'
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', defaultValue = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);
		await step('Check if value text shows default value', async () => {
			const button = within(container).getByRole('button', { name: label });
			expect(button).toHaveTextContent(defaultValue.toUpperCase());
		});
	}
};

export const OpenColorPicker: Story = {
	args: {
		label: 'Open Color Picker'
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label } = args;

		const container = canvas.getByTestId(dataTestid);
		const trigger = canvas.getByRole('button', { name: label });

		await step('Toggle trigger button to open dialog', async () => {
			await userEvent.click(trigger);
		});

		await step('Check if dialog is opened', async () => {
			const dialogId = trigger.getAttribute('aria-controls') ?? '';
			const dialog = container.querySelector(`[id="${dialogId}"]`);
			expect(dialog).toBeVisible();
		});

		const dialogId = trigger.getAttribute('aria-controls') ?? '';
		const dialog = container.querySelector(`[id="${dialogId}"]`) as HTMLElement;

		await step('Check if color area and its components are displayed', async () => {
			const colorArea = dialog.querySelector('[data-part="area"]') as HTMLElement;
			expect(colorArea).toBeVisible();

			const colorAreaBackground = colorArea.querySelector('[data-part="area-background"]');
			expect(colorAreaBackground).toBeVisible();

			const colorAreaThumb = within(colorArea).getByRole('slider', {
				name: colorPickerAreaThumbLabel
			});
			expect(colorAreaThumb).toBeVisible();
		});

		await step('Check if hue slider is displayed', async () => {
			const hueSlider = within(dialog).getByRole('slider', {
				name: 'hue'
			});
			expect(hueSlider).toBeVisible();
		});

		await step('Check if alpha slider is displayed', async () => {
			const alphaSlider = within(dialog).getByRole('slider', {
				name: 'alpha'
			});
			expect(alphaSlider).toBeVisible();
		});
	}
};

export const TestUpdateOpenEvent: Story = {
	args: {
		label: 'Update Open Event',
		'onUpdate:open': fn()
	},
	play: async ({ canvas, args, step }) => {
		const { label } = args;

		const trigger = canvas.getByRole('button', { name: label });

		await step('Click trigger to open dialog', async () => {
			await userEvent.click(trigger);
		});

		await step('Check if update:open was called with true', async () => {
			await waitFor(() => {
				expect(args['onUpdate:open']).toHaveBeenCalledWith(true);
			});
		});

		await step('Press Escape to close dialog', async () => {
			await userEvent.keyboard('{Escape}');
		});

		await step('Check if update:open was called with false', async () => {
			await waitFor(() => {
				expect(args['onUpdate:open']).toHaveBeenCalledWith(false);
			});
		});
	}
};

export const BlankInput: Story = {
	args: {
		label: undefined,
		supportingText: undefined
	},
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;

		const container = canvas.getByTestId(dataTestid);

		await step('Check if input does not have label', async () => {
			const label = container.querySelector('label');
			expect(label).not.toBeInTheDocument();
		});

		await step('Check if input does not have supporting text', async () => {
			const supportingText = within(container).queryByRole('supportingText');
			expect(supportingText).not.toBeInTheDocument();
		});
	}
};

export const Controllable: Story = {
	args: {
		modelValue: '#00ff00'
	},
	render: (args) => ({
		components: { ColorPicker },
		setup() {
			const { 'onUpdate:modelValue': onModelValueUpdate } = args;
			const value = ref(args.modelValue as string);
			const handleValueChange = (val: string) => {
				if (onModelValueUpdate) onModelValueUpdate(val);
				value.value = val;
			};
			return () => (
				<div>
					<ColorPicker {...args} modelValue={value.value} onUpdate:modelValue={handleValueChange} />
					<p style="margin-left: 8px; margin-top: 12px;" aria-label="Displayed value">
						Value: {value.value}
					</p>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;

		const container = canvas.getByTestId(dataTestid);
		await step('Check if trigger shows initial value', async () => {
			const trigger = within(container).getByRole('button');
			expect(trigger).toHaveTextContent('00FF00');
		});

		await step('Check displayed value paragraph', async () => {
			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value: #00ff00');
		});

		const trigger = within(container).getByRole('button');

		await step('Open the dialog', async () => {
			await userEvent.click(trigger);
		});

		const dialogId = trigger.getAttribute('aria-controls') ?? '';
		const dialog = container.querySelector(`[id="${dialogId}"]`) as HTMLElement;

		await step('Change the value', async () => {
			const colorArea = dialog.querySelector('[data-part="area-background"]') as HTMLElement;

			await userEvent.pointer({
				keys: '[MouseLeft]',
				target: colorArea,
				coords: { x: 150, y: 150 }
			});
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Input',
		disabled: true,
		defaultValue: '#ff0000'
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label } = args;

		const container = canvas.getByTestId(dataTestid);
		await step('Check if input is disabled', async () => {
			const input = within(container).getByRole('textbox', { name: label });
			expect(input).toBeDisabled();
		});

		await step('Check if button is disabled', async () => {
			const button = within(container).getByRole('button', { name: label });
			expect(button).toBeDisabled();
		});
	}
};

export const Required: Story = {
	args: {
		label: 'Required Field',
		required: true
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label } = args;

		const container = canvas.getByTestId(dataTestid);
		await step('Check if input is required', async () => {
			const input = within(container).getByRole('textbox', { name: label });
			expect(input).toBeRequired();
		});
	}
};

export const Sizes: Story = {
	render: () => ({
		components: { ColorPicker },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<ColorPicker label="Small" size="sm" />
					<ColorPicker label="Medium" size="md" />
				</div>
			);
		}
	})
};

export const Statuses: Story = {
	render: () => ({
		components: { ColorPicker },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<ColorPicker label="Error" supportingText="Please enter a valid color." status="error" />
					<ColorPicker
						label="Warning"
						supportingText="Please enter a valid color."
						status="warning"
					/>
					<ColorPicker
						label="Success"
						supportingText="Please enter a valid color."
						status="success"
					/>
				</div>
			);
		}
	})
};

export const ColorFormats: Story = {
	render: () => ({
		components: { ColorPicker },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<ColorPicker label="Hex" format="hex" defaultValue="#ff0000" />
					<ColorPicker label="Hex Alpha" format="hex" defaultValue="#ff000080" />
					<ColorPicker label="HSLA" format="hsla" defaultValue="hsl(120, 100%, 50%)" />
					<ColorPicker label="HSLA Alpha" format="hsla" defaultValue="hsla(120, 100%, 50%, 0.5)" />
					<ColorPicker label="HSBA" format="hsba" defaultValue="hsl(120, 100%, 50%)" />
					<ColorPicker label="HSBA Alpha" format="hsba" defaultValue="hsla(120, 100%, 50%, 0.5)" />
					<ColorPicker label="RGBA" format="rgba" defaultValue="rgb(0, 255, 0)" />
					<ColorPicker label="RGBA Alpha" format="rgba" defaultValue="rgba(0, 255, 0, 0.5)" />
				</div>
			);
		}
	}),
	play: async ({ canvas, step }) => {
		await step('Check if different formats display correctly', async () => {
			const hexButton = canvas.getByRole('button', { name: 'Hex' });
			expect(hexButton).toHaveTextContent('#FF0000');

			const hexaButton = canvas.getByRole('button', { name: 'Hex Alpha' });
			expect(hexaButton).toHaveTextContent('#FF000080');

			const hslaButton = canvas.getByRole('button', { name: 'HSLA' });
			expect(hslaButton).toHaveTextContent('hsl(120, 100%, 50%)');

			const hslaAlphaButton = canvas.getByRole('button', { name: 'HSLA Alpha' });
			expect(hslaAlphaButton).toHaveTextContent('hsla(120, 100%, 50%, 0.5)');

			const hsbaButton = canvas.getByRole('button', { name: 'HSBA' });
			expect(hsbaButton).toHaveTextContent('hsb(120, 100%, 100%)');

			const hsbaAlphaButton = canvas.getByRole('button', { name: 'HSBA Alpha' });
			expect(hsbaAlphaButton).toHaveTextContent('hsba(120, 100%, 100%, 0.5)');

			const rgbaButton = canvas.getByRole('button', { name: 'RGBA' });
			expect(rgbaButton).toHaveTextContent('rgb(0, 255, 0)');

			const rgbaAlphaButton = canvas.getByRole('button', { name: 'RGBA Alpha' });
			expect(rgbaAlphaButton).toHaveTextContent('rgba(0, 255, 0, 0.5)');
		});
	}
};
