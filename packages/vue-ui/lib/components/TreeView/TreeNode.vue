<script setup lang="ts">
	import { TreeView, type TreeViewNodeState } from '@ark-ui/vue/tree-view';
	import {
		ChevronRightIcon,
		FolderIcon,
		FolderOpenIcon,
		DocumentIcon
	} from '@heroicons/vue/20/solid';

	import type { TreeNodeObject, TreeViewSlots } from './TreeView.type';

	defineProps<{
		node: TreeNodeObject;
		indexPath: number[];
	}>();

	type TreeNodeSlotProps = Pick<TreeViewSlots, 'treeNodeLabel' | 'branchIcon' | 'itemIcon'>;

	defineSlots<TreeNodeSlotProps>();

	const generateSlotProps = (nodeState: TreeViewNodeState, node: TreeNodeObject) => {
		return {
			isExpanded: nodeState.expanded,
			isSelected: nodeState.selected,
			isBranch: nodeState.isBranch,
			node
		};
	};
</script>

<template>
	<TreeView.NodeProvider
		:node="node"
		:index-path="indexPath"
	>
		<TreeView.NodeContext v-slot="nodeState">
			<template v-if="nodeState.isBranch">
				<TreeView.Branch
					class="TreeView_Branch"
					:aria-label="node.label"
				>
					<TreeView.BranchControl
						class="TreeView_BranchControl"
						:disabled="node.disabled"
						:aria-disabled="node.disabled"
					>
						<TreeView.BranchIndicator class="TreeView_BranchIndicator">
							<ChevronRightIcon class="TreeView_ChevronIcon" />
						</TreeView.BranchIndicator>

						<TreeView.BranchText class="TreeView_BranchText">
							<slot
								name="branchIcon"
								v-bind="generateSlotProps(nodeState, node)"
							>
								<FolderOpenIcon
									v-if="nodeState.expanded"
									class="TreeView_FolderIcon"
								/>
								<FolderIcon
									v-else
									class="TreeView_FolderIcon"
								/>
							</slot>
							<slot
								name="treeNodeLabel"
								v-bind="generateSlotProps(nodeState, node)"
							>
								{{ node.label }}
							</slot>
						</TreeView.BranchText>
					</TreeView.BranchControl>

					<TreeView.BranchContent class="TreeView_BranchContent">
						<TreeNode
							v-for="(child, index) in node.children"
							:key="child.value"
							:node="child"
							:index-path="[...indexPath, index as number]"
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
					</TreeView.BranchContent>
				</TreeView.Branch>
			</template>
			<template v-else>
				<template v-if="node.href">
					<TreeView.Item
						class="TreeView_Item"
						:disabled="node.disabled"
						:aria-disabled="node.disabled"
					>
						<a :href="node.href">
							<TreeView.ItemText class="TreeView_ItemText">
								<slot
									name="itemIcon"
									v-bind="generateSlotProps(nodeState, node)"
								>
									<DocumentIcon class="TreeView_DocumentIcon" />
								</slot>
								<slot
									name="treeNodeLabel"
									v-bind="generateSlotProps(nodeState, node)"
								>
									{{ node.label }}
								</slot>
							</TreeView.ItemText>
						</a>
					</TreeView.Item>
				</template>
				<template v-else>
					<TreeView.Item
						class="TreeView_Item"
						:disabled="node.disabled"
						:aria-disabled="node.disabled"
					>
						<TreeView.ItemText class="TreeView_ItemText">
							<slot
								name="itemIcon"
								v-bind="generateSlotProps(nodeState, node)"
							>
								<DocumentIcon class="TreeView_DocumentIcon" />
							</slot>
							<slot
								name="treeNodeLabel"
								v-bind="generateSlotProps(nodeState, node)"
							>
								{{ node.label }}
							</slot>
						</TreeView.ItemText>
					</TreeView.Item>
				</template>
			</template>
		</TreeView.NodeContext>
	</TreeView.NodeProvider>
</template>
