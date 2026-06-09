# Vue UI Story & Testing Guide

In the `@packages/vue-ui` library, we use **Storybook** alongside **Interaction Tests** (`@storybook/test`) to simultaneously document and unit test our components.

Instead of writing separate `.test.ts` files using Vitest, we write end-to-end component tests directly inside the Storybook `play` functions.

## 1. File Placement

Stories and tests are written in `.tsx` files. This allows us to use Vue's TSX support to easily wrap components and provide reactive states (like `v-model`) during testing.

Place your stories in the appropriate category folder under `packages/vue-ui/stories/`:

- Form components: `stories/FormFields/<ComponentName>.stories.tsx`
- Buttons: `stories/Buttons/<ComponentName>.stories.tsx`
- General display: `stories/DataDisplay/<ComponentName>.stories.tsx`

## 2. Basic Story Setup

Start by importing `Meta` and `StoryObj` from `@storybook/vue3-vite`, and your component. You should also import testing utilities from `storybook/test`.

```tsx
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, within, userEvent, fn } from 'storybook/test';
import { TextInput } from '@components/TextInput';

const mockedOnModelValueUpdate = fn();

const meta = {
	title: 'Components/FormField/TextInput',
	component: TextInput,
	tags: ['autodocs'],
	argTypes: {
		status: { control: 'select', options: ['default', 'error', 'success', 'warning'] },
		size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] }
	},
	args: {
		label: 'Email',
		placeholder: 'Enter your email',
		'onUpdate:modelValue': mockedOnModelValueUpdate // Bind mock to the emit
	},
	beforeEach() {
		mockedOnModelValueUpdate.mockClear(); // Reset mocks before every story
	}
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;
```

## 3. Writing Interaction Tests

Use the `play` function to interact with and assert the state of your component. Break your tests into logical `step` blocks for readable reporting in the Storybook UI.

```tsx
export const Default: Story = {
	play: async ({ canvasElement, args, step }) => {
		// within() scopes queries to the story canvas
		const canvas = within(canvasElement);
		const { label = '' } = args;

		await step('Check if input exists', async () => {
			const input = canvas.getByLabelText(label);
			expect(input).toBeInTheDocument();
		});

		await step('Check if input has placeholder', async () => {
			const input = canvas.getByLabelText(label);
			expect(input).toHaveAttribute('placeholder', args.placeholder);
		});
	}
};
```

## 4. Testing Reactivity (v-model) & Events

When testing components that rely on `v-model` (or complex internal state), define a custom `render` function using Vue TSX to provide a reactive `ref`.

```tsx
import { ref } from 'vue';

export const Controllable: Story = {
	args: {
		modelValue: 'initial value'
	},
	render: (args) => ({
		components: { TextInput },
		setup() {
			const value = ref(args.modelValue);

			const handleValueChange = (val: string) => {
				// Call the mocked emit function from Meta args
				if (args['onUpdate:modelValue']) {
					args['onUpdate:modelValue'](val);
				}
				value.value = val;
			};

			// Return TSX
			return () => (
				<div>
					<TextInput {...args} modelValue={value.value} onUpdate:modelValue={handleValueChange} />
					<p aria-label="Displayed value">Value: {value.value}</p>
				</div>
			);
		}
	}),
	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText(args.label as string);

		await step('Type new value', async () => {
			await userEvent.type(input, ' updated');
		});

		await step('Check if emit was called and reactive state updated', async () => {
			// Assert against the mocked function
			expect(mockedOnModelValueUpdate).toBeCalled();

			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value: initial value updated');
		});
	}
};
```

## 5. Rendering Visual Variations

Sometimes you don't need a `play` function, you just need to show different visual states (like all sizes or all statuses). You can return multiple components in the `render` setup:

```tsx
export const Sizes: Story = {
	render: () => ({
		components: { TextInput },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<TextInput label="Small" size="sm" />
					<TextInput label="Medium" size="md" />
					<TextInput label="Large" size="lg" />
				</div>
			);
		}
	})
};
```

## 💡 Best Practices

1. **Accessibility First**: Always use `canvas.getByLabelText` or `canvas.getByRole` rather than searching by class or ID. If a component isn't accessible, the tests will fail to find it!
2. **Test `aria` attributes**: If your component has supporting text, test that the `aria-describedby` attribute correctly maps to the supporting text element's ID.
3. **Use `step`**: Always wrap assertions and interactions in `await step('Description', async () => { ... })`. This makes debugging failing tests significantly easier.
