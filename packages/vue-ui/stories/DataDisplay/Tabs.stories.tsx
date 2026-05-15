import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Tabs, type TabItemObject } from '@components/Tabs';
import { ref } from 'vue';
import { expect, within, userEvent, fn } from 'storybook/test';

const mockedOnModelValueUpdate = fn();
const mockedOnValueChange = fn();
const mockedOnClose = fn();

const meta = {
	title: 'Components/DataDisplay/Tabs',
	component: Tabs,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		'onUpdate:modelValue': { action: 'update:modelValue' },
		onValueChange: { action: 'valueChange' },
		onClose: { action: 'close' },
		orientation: {
			control: 'select',
			options: ['horizontal', 'vertical']
		},
		activationMode: {
			control: 'select',
			options: ['automatic', 'manual']
		}
	},
	args: {
		'onUpdate:modelValue': mockedOnModelValueUpdate,
		onValueChange: mockedOnValueChange,
		onClose: mockedOnClose
	},
	render: (args) => ({
		components: { Tabs },
		setup() {
			return { args };
		},
		template: `
			<div class="flex justify-center">
				<Tabs class="w-full max-w-2xl border border-gray-300 p-8 rounded-xl shadow-lg bg-white" v-bind="args">
					<template v-for="item in args.items" :key="item.value" #[\`content-\${item.value}\`]>
						<div class="py-4 text-gray-600">{{ item.value }} content</div>
					</template>
				</Tabs>
			</div>
		`
	}),
	beforeEach() {
		mockedOnModelValueUpdate.mockClear();
		mockedOnValueChange.mockClear();
		mockedOnClose.mockClear();
	}
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		dataTestid: 'tabs-default',
		items: [
			{ value: 'account', title: 'Account' },
			{ value: 'password', title: 'Password' },
			{ value: 'billing', title: 'Billing' }
		],
		defaultValue: 'account'
	},
	render: (args) => ({
		components: { Tabs },
		setup() {
			return { args };
		},
		template: `
			<div class="flex justify-center">
				<Tabs class="w-full max-w-2xl border border-gray-300 p-8 rounded-xl shadow-lg bg-white" v-bind="args">
					<template #content-account>
						<div class="py-4 text-gray-600">Make changes to your account here.</div>
					</template>
					<template #content-password>
						<div class="py-4 text-gray-600">Change your password here.</div>
					</template>
					<template #content-billing>
						<div class="py-4 text-gray-600">Manage your billing and payment details.</div>
					</template>
				</Tabs>
			</div>
		`
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;

		const container = canvas.getByTestId(dataTestid);
		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if tabs exist', async () => {
			const tablist = within(container).getByRole('tablist');
			expect(tablist).toBeInTheDocument();
		});

		await step('Check default active tab', async () => {
			const accountTab = within(container).getByRole('tab', { name: 'Account' });
			expect(accountTab).toHaveAttribute('aria-selected', 'true');
			expect(within(container).getByText('Make changes to your account here.')).toBeInTheDocument();
		});

		await step('Click on another tab', async () => {
			const passwordTab = within(container).getByRole('tab', { name: 'Password' });
			await userEvent.click(passwordTab);
			expect(passwordTab).toHaveAttribute('aria-selected', 'true');
			expect(within(container).getByText('Change your password here.')).toBeInTheDocument();
		});
	}
};

export const DisabledTab: Story = {
	args: {
		dataTestid: 'tabs-disabled',
		items: [
			{ value: 'account', title: 'Account' },
			{
				value: 'password',
				title: 'Password',
				disabled: true
			},
			{ value: 'billing', title: 'Billing' }
		],
		defaultValue: 'account'
	},
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if disabled tab exists', async () => {
			const passwordTab = within(container).getByRole('tab', { name: 'Password' });
			expect(passwordTab).toHaveAttribute('aria-disabled', 'true');
		});

		await step('Try clicking disabled tab', async () => {
			const passwordTab = within(container).getByRole('tab', { name: 'Password' });
			await userEvent.click(passwordTab);
			// Should still not be selected
			expect(passwordTab).toHaveAttribute('aria-selected', 'false');
		});
	}
};

export const Controllable: Story = {
	args: {
		dataTestid: 'tabs-controllable',
		items: [
			{ value: 'account', title: 'Account' },
			{ value: 'password', title: 'Password' },
			{ value: 'billing', title: 'Billing' }
		],
		modelValue: 'password'
	},
	render: (args) => ({
		components: { Tabs },
		setup() {
			const currentValue = ref(args.modelValue ?? 'password');

			const handleValueChange = (val: string) => {
				mockedOnValueChange(val);
				currentValue.value = val;
			};

			const handleUpdateModelValue = (val: string) => {
				mockedOnModelValueUpdate(val);
				currentValue.value = val;
			};

			return () => (
				<div class="flex flex-col items-center">
					<Tabs
						class="w-full max-w-2xl border border-gray-300 p-8 rounded-xl shadow-lg bg-white"
						{...args}
						modelValue={currentValue.value}
						onValueChange={handleValueChange}
						onUpdate:modelValue={handleUpdateModelValue}
					>
						{{
							'content-account': () => <div class="py-4 text-gray-600">account content</div>,
							'content-password': () => <div class="py-4 text-gray-600">password content</div>,
							'content-billing': () => <div class="py-4 text-gray-600">billing content</div>
						}}
					</Tabs>
					<p class="mt-4 text-sm text-gray-500 font-medium" aria-label="Displayed value">
						Value: {currentValue.value}
					</p>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if input displays initial value', async () => {
			const passwordTab = within(container).getByRole('tab', { name: 'Password' });
			expect(passwordTab).toHaveAttribute('aria-selected', 'true');
		});

		await step('Change value via click', async () => {
			const billingTab = within(container).getByRole('tab', { name: 'Billing' });
			await userEvent.click(billingTab);
		});

		await step('Check if value change callbacks fired', async () => {
			expect(mockedOnModelValueUpdate).toHaveBeenLastCalledWith('billing');
			expect(mockedOnValueChange).toHaveBeenLastCalledWith('billing');

			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value: billing');
		});
	}
};

export const Vertical: Story = {
	args: {
		dataTestid: 'tabs-vertical',
		items: [
			{ value: 'account', title: 'Account' },
			{ value: 'password', title: 'Password' },
			{ value: 'billing', title: 'Billing' }
		],
		defaultValue: 'account',
		orientation: 'vertical'
	},
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if vertical styling applies', async () => {
			const tablist = within(container).getByRole('tablist');
			expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
		});
	}
};

export const CustomSlots: Story = {
	args: {
		dataTestid: 'tabs-custom-slots',
		items: [
			{ value: 'account', title: 'Account' },
			{ value: 'password', title: 'Password' }
		],
		defaultValue: 'account'
	},
	render: (args) => ({
		components: { Tabs },
		setup() {
			return () => (
				<div class="flex justify-center">
					<Tabs
						class="w-full max-w-2xl border border-gray-300 p-8 rounded-xl shadow-lg bg-white"
						{...args}
					>
						{{
							title: ({ item }: { item: TabItemObject }) => (
								<span class="text-blue-600 font-semibold">{item.title}</span>
							),
							'content-account': () => (
								<strong class="py-4 block text-green-700">
									Make changes to your account here.
								</strong>
							),
							'content-password': () => (
								<strong class="py-4 block text-green-700">Change your password here.</strong>
							)
						}}
					</Tabs>
				</div>
			);
		}
	}),
	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if custom title slot is rendered', async () => {
			const accountTab = within(container).getByRole('tab', { name: 'Account' });
			expect(accountTab).toBeInTheDocument();
		});

		await step('Check if custom content slot is rendered', async () => {
			const content = within(container).getByText('Make changes to your account here.');
			expect(content).toBeInTheDocument();
			expect(content.tagName.toLowerCase()).toBe('strong');
		});
	}
};

export const ClosableTabs: Story = {
	args: {
		dataTestid: 'tabs-closable',
		closable: true,
		items: [
			{ value: 'account', title: 'Account' },
			{ value: 'password', title: 'Password' },
			{ value: 'billing', title: 'Billing' }
		],
		defaultValue: 'account'
	},
	render: (args) => ({
		components: { Tabs },
		setup() {
			const items = ref([...args.items]);
			const handleClose = (value: string) => {
				mockedOnClose(value);
				items.value = items.value.filter((item) => item.value !== value);
			};
			return () => (
				<div class="flex justify-center">
					<Tabs
						class="w-full max-w-2xl border border-gray-300 p-8 rounded-xl shadow-lg bg-white"
						{...args}
						items={items.value}
						onClose={handleClose}
					>
						{{
							'content-account': () => <div class="py-4 text-gray-600">account content</div>,
							'content-password': () => <div class="py-4 text-gray-600">password content</div>,
							'content-billing': () => <div class="py-4 text-gray-600">billing content</div>
						}}
					</Tabs>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if close buttons are rendered', async () => {
			const closeButtons = within(container).getAllByRole('button');
			expect(closeButtons.length).toBeGreaterThan(0);
		});

		await step('Click close button on a tab', async () => {
			const passwordTab = within(container).getByRole('tab', { name: 'Password' });
			const closeButton = within(passwordTab).getByRole('button');
			await userEvent.click(closeButton);
		});

		await step('Check if tab is removed', async () => {
			expect(within(container).queryByRole('tab', { name: 'Password' })).not.toBeInTheDocument();
			expect(mockedOnClose).toHaveBeenLastCalledWith('password');
		});
	}
};

export const FallbackContent: Story = {
	args: {
		dataTestid: 'tabs-fallback',
		items: [
			{ value: 'account', title: 'Account' },
			{ value: 'password', title: 'Password' },
			{ value: 'billing', title: 'Billing' }
		],
		defaultValue: 'account'
	},
	render: (args) => ({
		components: { Tabs },
		setup() {
			return () => (
				<div class="flex justify-center">
					<Tabs
						class="w-full max-w-2xl border border-gray-300 p-8 rounded-xl shadow-lg bg-white"
						{...args}
					>
						{{
							'content-account': () => (
								<div class="py-4 text-blue-600">Specific Account Content</div>
							),
							content: ({ item }: { item: TabItemObject }) => (
								<div class="py-4 text-gray-500 italic">
									Default fallback content for: {item.title}
								</div>
							)
						}}
					</Tabs>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check specific content for Account', async () => {
			expect(within(container).getByText('Specific Account Content')).toBeInTheDocument();
		});

		await step('Check fallback content for Password', async () => {
			const passwordTab = within(container).getByRole('tab', { name: 'Password' });
			await userEvent.click(passwordTab);
			expect(
				within(container).getByText('Default fallback content for: Password')
			).toBeInTheDocument();
		});

		await step('Check fallback content for Billing', async () => {
			const billingTab = within(container).getByRole('tab', { name: 'Billing' });
			await userEvent.click(billingTab);
			expect(
				within(container).getByText('Default fallback content for: Billing')
			).toBeInTheDocument();
		});
	}
};
