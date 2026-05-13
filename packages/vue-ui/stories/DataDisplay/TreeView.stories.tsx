import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { TreeView, type TreeNodeObject, type TreeViewPublicInstance } from '@components/TreeView';
import { Button } from '@components/Button';
import { TextInput } from '@components/TextInput';
import { ref } from 'vue';
import { expect, within, userEvent, fn, waitFor } from 'storybook/test';

const defaultItems = [
	{
		value: 'node_modules',
		label: 'node_modules',
		children: [
			{
				value: 'node_modules/@types',
				label: '@types',
				children: [
					{ value: 'node_modules/@types/react', label: 'react' },
					{ value: 'node_modules/@types/react-dom', label: 'react-dom' }
				]
			},
			{ value: 'node_modules/zag-js', label: 'zag-js' },
			{ value: 'node_modules/pandacss', label: 'panda' }
		]
	},
	{
		value: 'src',
		label: 'src',
		children: [
			{ value: 'src/app.tsx', label: 'app.tsx' },
			{ value: 'src/index.ts', label: 'index.ts' }
		]
	},
	{ value: 'panda.config', label: 'panda.config.ts' },
	{ value: 'package.json', label: 'package.json' },
	{ value: 'readme.md', label: 'README.md' }
] as const satisfies TreeNodeObject[];

const mockedOnExpandedChange = fn();
const mockedOnSelectionChange = fn();
const mockedOnUpdateExpandedValue = fn();
const mockedOnUpdateSelectedValue = fn();

const meta = {
	title: 'Components/DataDisplay/TreeView',
	component: TreeView,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onExpandedChange: { action: 'expandedChange' },
		onSelectionChange: { action: 'selectionChange' },
		'onUpdate:expandedValue': { action: 'update:expandedValue' },
		'onUpdate:selectedValue': { action: 'update:selectedValue' }
	},
	args: {
		items: defaultItems,
		dataTestid: 'default-tree-view',
		onExpandedChange: mockedOnExpandedChange,
		onSelectionChange: mockedOnSelectionChange,
		'onUpdate:expandedValue': mockedOnUpdateExpandedValue,
		'onUpdate:selectedValue': mockedOnUpdateSelectedValue
	},
	beforeEach() {
		mockedOnExpandedChange.mockClear();
		mockedOnSelectionChange.mockClear();
		mockedOnUpdateExpandedValue.mockClear();
		mockedOnUpdateSelectedValue.mockClear();
	},
	render: (args) => ({
		components: { TreeView },
		setup() {
			return { args };
		},
		template: '<TreeView v-bind="args" />'
	})
} satisfies Meta<typeof TreeView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if root items are rendered', async () => {
			expect(
				within(container).getByRole('button', { name: defaultItems[0].label })
			).toBeInTheDocument();
			expect(
				within(container).getByRole('button', { name: defaultItems[1].label })
			).toBeInTheDocument();
			expect(
				within(container).getByRole('treeitem', { name: defaultItems[3].label })
			).toBeInTheDocument();
		});

		const firstTrigger = within(container).getByRole('button', { name: defaultItems[0].label });

		await step('Click first branch to expand', async () => {
			await userEvent.click(firstTrigger);
		});

		await step('Check if children are now visible', async () => {
			await waitFor(() => {
				expect(
					within(container).getByRole('button', { name: defaultItems[0].children[0].label })
				).toBeVisible();
			});
		});
	}
};

export const DefaultState: Story = {
	args: {
		items: defaultItems,
		defaultExpandedValue: [defaultItems[0].value],
		dataTestid: 'treeview-default-expanded',
		defaultSelectedValue: [defaultItems[3].value]
	},
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if expanded children are visible by default', async () => {
			const item = await waitFor(() =>
				within(container).getByRole('button', { name: defaultItems[0].children[0].label })
			);
			expect(item).toBeVisible();
		});

		await step('Check if selected value is correct', async () => {
			const item = await waitFor(() =>
				within(container).getByRole('treeitem', { name: defaultItems[3].label })
			);
			expect(item).toBeVisible();
		});
	}
};

export const ControllableSelection: Story = {
	args: {
		items: defaultItems,
		selectedValue: [defaultItems[3].value],
		dataTestid: 'treeview-selection'
	},
	render: (args) => ({
		components: { TreeView },
		setup() {
			const selectedValue = ref(args.selectedValue);

			const handleSelectionChange = (val: string[]) => {
				mockedOnSelectionChange(val);
				selectedValue.value = val;
			};

			return () => (
				<div>
					<TreeView
						{...args}
						selectedValue={selectedValue.value}
						onUpdate:selectedValue={handleSelectionChange}
					/>
					<p style={{ marginTop: '16px' }} aria-label="Selected Item">
						Selected: {selectedValue.value?.join(', ')}
					</p>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if initial selected value is correct', async () => {
			const displayedValue = canvas.getByLabelText('Selected Item');
			expect(displayedValue).toHaveTextContent(`Selected: ${defaultItems[3].value}`);
		});

		const nextItem = within(container).getByRole('treeitem', { name: defaultItems[4].label });

		await step('Click different item to select it', async () => {
			await userEvent.click(nextItem);
		});

		await step('Check if selected value changed', async () => {
			const displayedValue = canvas.getByLabelText('Selected Item');
			expect(displayedValue).toHaveTextContent(`Selected: ${defaultItems[4].value}`);
			expect(mockedOnSelectionChange).toHaveBeenCalled();
		});
	}
};

export const ControllableExpanded: Story = {
	args: {
		expandedValue: []
	},
	render: (args) => ({
		components: { TreeView },
		setup() {
			const { expandedValue: initialExpandedValue, onExpandedChange } = args;
			const expandedValue = ref(initialExpandedValue);

			const handleExpandedChange = (val: string[]) => {
				onExpandedChange?.({ expandedValue: val });
				expandedValue.value = val;
			};

			return () => (
				<div>
					<button
						data-testid="expand-nodes"
						onClick={() => {
							expandedValue.value = [defaultItems[0].value, defaultItems[1].value];
						}}
					>
						Expand {defaultItems[0].label} and {defaultItems[1].label}
					</button>
					<TreeView
						{...args}
						expandedValue={expandedValue.value}
						onUpdate:expandedValue={handleExpandedChange}
					/>
					<p style={{ marginTop: '16px' }} aria-label="Expanded Items">
						Expanded: {expandedValue.value?.join(', ')}
					</p>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if initial expanded is empty', async () => {
			const displayedValue = canvas.getByLabelText('Expanded Items');
			expect(displayedValue).toHaveTextContent('Expanded:');
		});

		const button = canvas.getByTestId('expand-nodes');

		await step('Click external control button', async () => {
			await userEvent.click(button);
		});

		await step('Check if tree expanded', async () => {
			const displayedValue = canvas.getByLabelText('Expanded Items');
			expect(displayedValue).toHaveTextContent(
				`Expanded: ${defaultItems[0].value}, ${defaultItems[1].value}`
			);
			await waitFor(() => {
				expect(
					within(container).getByRole('treeitem', { name: defaultItems[1].children[0].label })
				).toBeVisible();
				expect(
					within(container).getByRole('button', { name: defaultItems[0].children[0].label })
				).toBeVisible();
			});
		});
	}
};

export const LazyMountAndUnmount: Story = {
	args: {
		lazyMount: true,
		unmountOnExit: true
	}
};

export const PublicMethods: Story = {
	args: {
		items: defaultItems
	},
	render: (args) => ({
		components: { TreeView, Button },
		setup() {
			const treeViewRef = ref<TreeViewPublicInstance | null>(null);
			return { args, treeViewRef };
		},
		template: `
			<div>
				<div style="margin-bottom: 16px; display: flex; gap: 8px;">
					<Button data-testid="expand-all" @click="treeViewRef?.expand()">Expand All</Button>
					<Button data-testid="collapse-all" @click="treeViewRef?.collapse()">Collapse All</Button>
				</div>
				<TreeView ref="treeViewRef" v-bind="args" />
			</div>
		`
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);
		const expandBtn = canvas.getByTestId('expand-all');
		const collapseBtn = canvas.getByTestId('collapse-all');

		await step('Initial state: branches are collapsed', async () => {
			expect(within(container).queryByText(defaultItems[0].children[0].label)).not.toBeVisible();
			expect(within(container).queryByText(defaultItems[1].children[0].label)).not.toBeVisible();
		});

		await step('Click Expand All button', async () => {
			await userEvent.click(expandBtn);
		});

		await step('Check if all branches are expanded', async () => {
			await waitFor(() => {
				expect(within(container).getByText(defaultItems[0].children[0].label)).toBeVisible();
				expect(within(container).getByText(defaultItems[1].children[0].label)).toBeVisible();
			});
		});

		await step('Click Collapse All button', async () => {
			await userEvent.click(collapseBtn);
		});

		await step('Check if all branches are collapsed', async () => {
			await waitFor(() => {
				expect(within(container).queryByText(defaultItems[0].children[0].label)).not.toBeVisible();
				expect(within(container).queryByText(defaultItems[1].children[0].label)).not.toBeVisible();
			});
		});
	}
};

export const OverrideIconNodeLabel: Story = {
	args: {
		items: defaultItems,
		dataTestid: 'treeview-override'
	},
	render: (args) => ({
		components: { TreeView },
		setup() {
			return { args };
		},
		template: `
			<TreeView v-bind="args">
				<template #branchIcon="{ isExpanded }">
					<span data-testid="custom-branch-icon">{{ isExpanded ? '📂' : '📁' }}</span>
				</template>
				<template #itemIcon>
					<span data-testid="custom-item-icon">📄</span>
				</template>
				<template #treeNodeLabel="{ node }">
					<span data-testid="custom-node-label" style="color: blue;">{{ node.label }} (Custom)</span>
				</template>
			</TreeView>
		`
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		const firstBranchLabel = defaultItems[0].label;
		const itemLabel = defaultItems[3].label;
		const readmeLabel = defaultItems[4].label;
		const nestedItemLabel = defaultItems[0].children[0].label;

		await step('Check if custom labels are rendered', async () => {
			expect(within(container).getByText(`${firstBranchLabel} (Custom)`)).toBeInTheDocument();
			expect(within(container).getByText(`${itemLabel} (Custom)`)).toBeInTheDocument();
			expect(within(container).getByText(`${readmeLabel} (Custom)`)).toBeInTheDocument();
		});

		await step('Check if custom branch icons are rendered', async () => {
			const branchIcons = within(container).getAllByTestId('custom-branch-icon');
			expect(branchIcons.length).toBeGreaterThan(0);
			expect(branchIcons[0]).toHaveTextContent('📁');
		});

		await step('Check if custom item icons are rendered', async () => {
			const itemIcons = within(container).getAllByTestId('custom-item-icon');
			expect(itemIcons.length).toBeGreaterThan(0);
			expect(itemIcons[0]).toHaveTextContent('📄');
		});

		const firstTrigger = within(container).getByText(`${firstBranchLabel} (Custom)`);

		await step('Click first branch to expand and check expanded icon', async () => {
			await userEvent.click(firstTrigger);
			await waitFor(() => {
				const branchIcons = within(container).getAllByTestId('custom-branch-icon');
				expect(branchIcons[0]).toHaveTextContent('📂');
				expect(within(container).getByText(`${nestedItemLabel} (Custom)`)).toBeVisible();
			});
		});
	}
};

export const DisabledNodes: Story = {
	args: {
		items: [
			{
				value: 'enabled-branch',
				label: 'Enabled Branch',
				children: [{ value: 'enabled-child', label: 'Enabled Child' }]
			},
			{
				value: 'disabled-branch',
				label: 'Disabled Branch',
				disabled: true,
				children: [{ value: 'hidden-child', label: 'Hidden Child' }]
			},
			{ value: 'disabled-item', label: 'Disabled Item', disabled: true }
		],
		dataTestid: 'treeview-disabled'
	},
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		const disabledBranch = within(container).getByRole('button', { name: 'Disabled Branch' });

		await step('Check if disabled branch has correct disabled attributes', async () => {
			expect(disabledBranch).toHaveAttribute('aria-disabled', 'true');
		});

		await step('Check if item is disabled', () => {
			const disabledItem = within(container).getByRole('treeitem', { name: 'Disabled Item' });
			expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
		});
	}
};

export const Filtering: Story = {
	args: {
		items: defaultItems,
		dataTestid: 'treeview-filtering'
	},
	render: (args) => ({
		components: { TreeView, TextInput },
		setup() {
			const filterText = ref('');

			const filterFunc = (node: TreeNodeObject): boolean => {
				if (!filterText.value) return true;

				const query = filterText.value.toLowerCase();

				const matches = (n: TreeNodeObject): boolean => {
					if (n.label.toLowerCase().includes(query)) {
						return true;
					}
					if (n.children) {
						return n.children.some(matches);
					}
					return false;
				};

				return matches(node);
			};

			return () => (
				<div class="flex flex-col gap-2 w-[400px]">
					<TextInput
						label="Search File Explorer"
						data-testid="treeview-search-input"
						placeholder="Filter files and directories..."
						modelValue={filterText.value}
						onUpdate:modelValue={(val: string) => {
							filterText.value = val;
						}}
						clearable
						class="w-full"
					/>
					<TreeView
						{...args}
						filterFunc={filterFunc}
						defaultExpandedValue={['node_modules', 'node_modules/@types', 'src']}
					/>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const treeView = canvas.getByTestId(dataTestid);
		const searchInput = canvas.getByRole('textbox', { name: 'Search File Explorer' });

		await step('Check if tree view and search input exist', async () => {
			expect(treeView).toBeInTheDocument();
			expect(searchInput).toBeInTheDocument();
		});

		await step('Initial state: all top-level items are present', async () => {
			expect(within(treeView).getByRole('button', { name: 'node_modules' })).toBeVisible();
			expect(within(treeView).getByRole('button', { name: 'src' })).toBeVisible();
			expect(within(treeView).getByRole('treeitem', { name: 'package.json' })).toBeVisible();
		});

		await step('Type "react" into search input', async () => {
			await userEvent.type(searchInput, 'react');
			await waitFor(() => {
				expect(searchInput).toHaveValue('react');
			});
		});

		await step(
			'Verify filtered state: "react" and its ancestors are shown, non-matching are hidden',
			async () => {
				await waitFor(() => {
					expect(within(treeView).getByRole('treeitem', { name: 'react' })).toBeVisible();
					expect(within(treeView).getByRole('treeitem', { name: 'react-dom' })).toBeVisible();
					expect(within(treeView).getByRole('button', { name: 'node_modules' })).toBeVisible();
					expect(within(treeView).getByRole('button', { name: '@types' })).toBeVisible();

					expect(within(treeView).queryByRole('button', { name: 'src' })).not.toBeInTheDocument();
					expect(
						within(treeView).queryByRole('treeitem', { name: 'package.json' })
					).not.toBeInTheDocument();
				});
			}
		);

		await step('Clear the search input', async () => {
			await userEvent.clear(searchInput);
			await waitFor(() => {
				expect(searchInput).toHaveValue('');
			});
		});

		await step('Verify all original items are restored', async () => {
			await waitFor(() => {
				expect(within(treeView).getByRole('button', { name: 'node_modules' })).toBeVisible();
				expect(within(treeView).getByRole('button', { name: 'src' })).toBeVisible();
				expect(within(treeView).getByRole('treeitem', { name: 'package.json' })).toBeVisible();
			});
		});
	}
};
