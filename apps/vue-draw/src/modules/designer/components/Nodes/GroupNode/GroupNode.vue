<script setup lang="ts">
	import { type NodeProps, useVueFlow } from '@vue-flow/core';
	import { NodeResizer } from '@vue-flow/node-resizer';

	import { BaseCanvasNode } from '@/modules/designer/components/Nodes/BaseNode';
	import { useGrouping } from '@/modules/designer/composables/useGrouping';
	import { useGroupResize } from '@/modules/designer/composables/useGroupResize';
	import { resizerHandleStyle, resizerLineStyle } from '@/modules/designer/constant/default';

	import type { GroupNodeData } from '@/modules/designer/types/Node.type';

	export type GroupNodeProps = NodeProps<GroupNodeData>;

	const props = defineProps<GroupNodeProps>();

	const { onNodesChange } = useVueFlow();
	const { removeEntireGroup, isGroupSelected } = useGrouping();
	const { onResizeStart, onResize, onResizeEnd } = useGroupResize(props.id);

	onNodesChange((changes) => {
		const isNodeRemoving = changes.some(
			(change) => change.type === 'remove' && change.id === props.id
		);

		if (isNodeRemoving) {
			removeEntireGroup(props.id);
		}
	});
</script>

<template>
	<BaseCanvasNode
		v-bind="props"
		:hide-connector="true"
	>
		<template #resizer="{ selected }">
			<NodeResizer
				:is-visible="selected"
				:min-width="80"
				:min-height="60"
				:line-style="resizerLineStyle"
				:handle-style="resizerHandleStyle"
				@resize-start="onResizeStart"
				@resize="onResize"
				@resize-end="onResizeEnd"
			/>
		</template>

		<template #default>
			<div class="relative h-full w-full">
				<div
					class="pointer-events-none absolute inset-0 border border-dashed transition-colors duration-150"
					:class="isGroupSelected(id) ? 'border-blue-500' : 'border-transparent'"
				/>
			</div>
		</template>
	</BaseCanvasNode>
</template>
