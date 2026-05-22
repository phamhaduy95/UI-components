<script setup lang="ts">
import { useDnD } from '@/modules/designer/composables/useDnD';
import { nodeConfigMap } from '@/modules/designer/constant/nodeConfig';
import { Background } from '@vue-flow/background';
import { useVueFlow, VueFlow, type Edge, type NodeChange } from '@vue-flow/core';
import { DesignerLeftPanel, DesignerRightPanel, DesignerToolbar } from './layouts';
import type { DesignerNode } from './types/Designer.type';
import { useHistory } from './composables/useHistory';
import { useNodeCommandFactory } from './composables/useCommandFactory';
import type { NodePositionEntry } from './types/Command.type';

// We let vue-flow manage state of nodes and edges internally to reduce memory usage
const initialNodes: Array<DesignerNode> = [];
const initialEdges: Array<Edge> = [];

const { findNode } = useVueFlow();

const { onPaletteDrop, onPaletteDragOver } = useDnD();

const initiateNodeTypes = () => {
	const types: Record<string, any> = {};
	for (const key in nodeConfigMap) {
		const nodeComponent = nodeConfigMap[key]?.nodeComponent;
		if (nodeComponent) {
			types[key] = nodeComponent;
		}
	}
	return types;
};

const { commit } = useHistory();
const { createDeleteNodesCommand, createRepositionNodesCommand } = useNodeCommandFactory();

const beforePositions = new Map<string, { x: number; y: number }>();
let isDragging = false;

const onNodesChange = (changes: NodeChange[]) => {
	const positionChanges = changes.filter((c) => c.type === 'position');
	if (positionChanges.length > 0) {
		const firstChange = positionChanges[0] as { type: 'position'; id: string; dragging?: boolean };

		if (firstChange.dragging && !isDragging) {
			isDragging = true;
			const { getSelectedNodes } = useVueFlow();
			const selected = getSelectedNodes.value;
			const targets =
				selected.length > 0
					? selected
					: (positionChanges.map((c) => findNode((c as any).id)).filter(Boolean) as DesignerNode[]);
			targets.forEach((n) => {
				if (!beforePositions.has(n.id)) {
					beforePositions.set(n.id, { x: n.position.x, y: n.position.y });
				}
			});
		}

		if (!firstChange.dragging && isDragging) {
			isDragging = false;

			const entries: NodePositionEntry[] = [];
			beforePositions.forEach((before, nodeId) => {
				const node = findNode(nodeId);
				if (!node) return;
				const after = { x: node.position.x, y: node.position.y };
				if (before.x !== after.x || before.y !== after.y) {
					entries.push({ nodeId, before, after });
				}
			});

			if (entries.length > 0) {
				commit(createRepositionNodesCommand(entries));
			}
			beforePositions.clear();
		}
	}

	changes.forEach((change) => {
		if (change.type === 'remove') {
			const node = findNode(change.id);
			if (!node) return;
			const command = createDeleteNodesCommand([node]);
			commit(command);
		}
	});
};

const nodeTypes = initiateNodeTypes();
</script>

<template>
	<div class="flex h-full w-full flex-col overflow-hidden bg-gray-50">
		<!-- Top Toolbar -->
		<div
			class="z-10 flex h-12 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm"
		>
			<DesignerToolbar />
		</div>
		<div class="flex flex-1 overflow-hidden">
			<!-- Left Panel: Asset Library -->
			<DesignerLeftPanel />

			<!-- Center Canvas -->
			<main class="relative flex-1" @drop="onPaletteDrop" @dragover="onPaletteDragOver">
				<VueFlow
					:nodes="initialNodes"
					:edges="initialEdges"
					:node-types="nodeTypes"
					:default-zoom="1"
					:min-zoom="0.7"
					:max-zoom="5"
					:elevate-nodes-on-select="false"
					:zoom-on-double-click="false"
					@nodes-change="onNodesChange"
				>
					<Background :variant="'dots'" :gap="24" :size="2" pattern-color="#d1d5db" />
				</VueFlow>
			</main>
			<!-- Right Panel: Properties -->
			<DesignerRightPanel />
		</div>
	</div>
</template>
