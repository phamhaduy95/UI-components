<script setup lang="ts">
	import { computed, shallowRef, watch } from 'vue';
	import {
		TreeView,
		createTreeCollection,
		useTreeView,
		type TreeCollection,
		type UseTreeViewProps
	} from '@ark-ui/vue/tree-view';

	import TreeNode from './TreeNode.vue';
	import type {
		TreeViewProps,
		TreeViewEmits,
		TreeViewSlots,
		TreeNodeObject,
		TreeViewPublicInstance
	} from './TreeView.type';

	import '@packages/styles/components/TreeView.css';

	const props = withDefaults(defineProps<TreeViewProps>(), {
		items: () => [],
		expandedValue: undefined,
		selectedValue: undefined,
		defaultExpandedValue: undefined,
		defaultSelectedValue: undefined,
		filterFunc: undefined
	});

	const emit = defineEmits<TreeViewEmits>();

	defineSlots<TreeViewSlots>();

	const initalCollection = createTreeCollection<TreeNodeObject>({
		nodeToValue: (node) => node.value,
		nodeToString: (node) => node.label,
		rootNode: {
			value: 'ROOT',
			label: '',
			children: props.items
		}
	});

	const collection = shallowRef<TreeCollection<TreeNodeObject>>(initalCollection);

	watch(
		() => props.items,
		(items) => {
			collection.value = createTreeCollection<TreeNodeObject>({
				nodeToValue: (node) => node.value,
				nodeToString: (node) => node.label,
				rootNode: {
					value: 'ROOT',
					label: '',
					children: items
				}
			});
		}
	);

	const filteredCollection = computed(() => {
		if (!props.filterFunc) {
			return collection.value;
		}

		return collection.value.filter((node) => props.filterFunc!(node));
	});

	const handleExpandedChange = (details: { expandedValue: string[] }) => {
		emit('update:expandedValue', details.expandedValue);
		emit('expandedChange', details);
	};

	const handleSelectionChange = (details: { selectedValue: string[] }) => {
		emit('update:selectedValue', details.selectedValue);
		emit('selectionChange', details);
	};

	const treeViewProps = computed<UseTreeViewProps<TreeNodeObject>>(() => {
		return {
			collection: filteredCollection.value,
			expandedValue: props.expandedValue,
			selectedValue: props.selectedValue,
			defaultExpandedValue: props.defaultExpandedValue,
			defaultSelectedValue: props.defaultSelectedValue,
			lazyMount: props.lazyMount,
			unmountOnExit: props.unmountOnExit
		};
	});

	const treeView = useTreeView(treeViewProps, (event, args) => {
		switch (event) {
			case 'expandedChange':
				handleExpandedChange(args as TreeView.ExpandedChangeDetails<TreeNodeObject>);
				break;
			case 'selectionChange':
				handleSelectionChange(args as TreeView.SelectionChangeDetails<TreeNodeObject>);
				break;
			default:
				break;
		}
	});

	defineExpose<TreeViewPublicInstance>({
		collapse: treeView.value.collapse,
		expand: treeView.value.expand
	});
</script>

<template>
	<TreeView.RootProvider
		:value="treeView"
		class="TreeView"
		:data-testid="dataTestid"
	>
		<TreeView.Label
			v-if="$slots.label"
			class="TreeView_Label"
		>
			<slot name="label" />
		</TreeView.Label>
		<TreeView.Tree class="TreeView_Tree">
			<TreeNode
				v-for="(node, index) in filteredCollection.rootNode.children"
				:key="node.value"
				:node="node"
				:index-path="[index as number]"
			>
				<template #treeNodeLabel="treeNodeProps">
					<slot
						name="treeNodeLabel"
						v-bind="treeNodeProps"
					/>
				</template>
				<template #branchIcon="branchIconProps">
					<slot
						name="branchIcon"
						v-bind="branchIconProps"
					/>
				</template>
				<template #itemIcon="itemIconProps">
					<slot
						name="itemIcon"
						v-bind="itemIconProps"
					/>
				</template>
			</TreeNode>
		</TreeView.Tree>
	</TreeView.RootProvider>
</template>
