<script setup lang="ts">
	import { onMounted, onUnmounted, warn, type ComponentInstance } from 'vue';

	import { Background } from '@vue-flow/background';
	import { VueFlow, type Connection, type Edge, type NodeComponent } from '@vue-flow/core';
	import { MiniMap } from '@vue-flow/minimap';

	import { nodeConfigMap } from '@/modules/designer/constant/nodeConfig';
	import { NodeContextMenu } from './components/Dialog/NodeContextMenu';
	import { ShapeSelectionDialog } from './components/Dialog/ShapeSelectionDialog';
	import { DesignLeftPanel, DesignRightPanel, DesignToolbar } from './layouts';

	import { BaseEdge, EdgeMarkerDef, ConnectionLine } from './components/Edges';

	import { useDnD } from './composables/useDnD';
	import { useCanvasConfig } from './composables/useCanvasConfig';
	import { useNodeCommandFactory } from './composables/useCommandFactory';
	import { useContextMenu } from './composables/useContextMenu';
	import { useEdgeConfig } from './composables/useEdgeConfig';
	import { useHistory } from './composables/useHistory';
	import { useKeyboardBindings } from './composables/useKeyboardBindings';
	import { useNodeMovement } from './composables/useNodeMovement';
	import { useNodeConfig } from './composables/useNodeConfig';

	import { generateEdge } from '@/modules/designer/utils/edge.utils';

	import type { DesignGraphNode } from './types/Node.type';
	import { useEdgeCreation } from './composables/useEdgeCreation';

	// We let vue-flow manage state of nodes and edges internally to reduce memory usage
	const initialNodes: Array<DesignGraphNode> = [];
	const initialEdges: Array<Edge> = [];

	type VueFlowProps = ComponentInstance<typeof VueFlow>['$props'];

	const { onPaletteDrop, onPaletteDragOver } = useDnD();

	const { setSelectedNode } = useNodeConfig();

	const handleNodeClick: VueFlowProps['onNodeClick'] = (event) => {
		setSelectedNode(event.node);
	};

	const initiateNodeTypes = () => {
		const types: Record<string, NodeComponent> = {};
		for (const key in nodeConfigMap) {
			const nodeComponent = nodeConfigMap[key]?.nodeComponent;
			if (nodeComponent) {
				types[key] = nodeComponent;
			}
		}

		return types;
	};

	const { commit } = useHistory();
	const { createEdges } = useEdgeCreation();
	const { createUpdateEdgeCommand } = useNodeCommandFactory();
	const { onNodeDragStart, onNodeDragStop } = useNodeMovement();

	const { register, unregister } = useKeyboardBindings();

	onMounted(() => {
		register();
	});

	onUnmounted(() => {
		unregister();
	});

	const { setSelectedEdge } = useEdgeConfig();

	const onEdgeClick: VueFlowProps['onEdgeClick'] = (event) => {
		setSelectedEdge(event.edge);
	};

	const nodeTypes = initiateNodeTypes();

	const { contextMenu, onNodeContextMenu, closeContextMenu } = useContextMenu();

	const { canvasConfig } = useCanvasConfig();

	const onConnect = (connection: Connection) => {
		if (connection.source === connection.target) {
			warn('Source and target cannot be the same');
			return;
		}

		const edge = generateEdge({
			...connection,
			type: 'default'
		});
		createEdges([edge]);
	};

	// the event handler when user change connection
	const onEdgeUpdate = (edgeUpdate: { edge: Edge; connection: Connection }) => {
		commit(
			createUpdateEdgeCommand([
				{
					edgeId: edgeUpdate.edge.id,
					beforeData: {
						source: edgeUpdate.edge.source,
						target: edgeUpdate.edge.target,
						sourceHandle: edgeUpdate.edge.sourceHandle,
						targetHandle: edgeUpdate.edge.targetHandle
					},
					afterData: {
						source: edgeUpdate.connection.source,
						target: edgeUpdate.connection.target,
						sourceHandle: edgeUpdate.connection.sourceHandle,
						targetHandle: edgeUpdate.connection.targetHandle
					}
				}
			])
		);
	};
</script>

<template>
	<div class="flex h-full w-full flex-col overflow-hidden bg-gray-50">
		<!-- Top Toolbar -->
		<div
			class="z-10 flex h-10 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-2 shadow-sm"
		>
			<DesignToolbar />
		</div>
		<div class="flex flex-1 overflow-hidden">
			<!-- Left Panel: Asset Library -->
			<DesignLeftPanel />

			<!-- Center Canvas -->
			<main
				class="relative flex-1"
				@drop="onPaletteDrop"
				@dragover="onPaletteDragOver"
			>
				<EdgeMarkerDef />
				<VueFlow
					:nodes="initialNodes"
					:edges="initialEdges"
					:node-types="nodeTypes"
					:default-zoom="1"
					:min-zoom="0.7"
					:max-zoom="5"
					:elevate-nodes-on-select="false"
					:zoom-on-double-click="false"
					:pan-on-drag="[1]"
					:delete-key-code="null"
					:edges-updatable="true"
					:snap-to-grid="canvasConfig.snapToGrid"
					:snap-grid="[canvasConfig.gridGap, canvasConfig.gridGap]"
					@pane-click="closeContextMenu"
					@node-context-menu="onNodeContextMenu"
					@connect="onConnect"
					@edge-click="onEdgeClick"
					@edge-update="onEdgeUpdate"
					@node-drag-start="onNodeDragStart"
					@node-drag-stop="onNodeDragStop"
					@node-click="handleNodeClick"
				>
					<Background
						v-if="canvasConfig.gridVisible"
						:variant="canvasConfig.gridVariant"
						:gap="canvasConfig.gridGap"
						:size="canvasConfig.gridSize"
						:pattern-color="canvasConfig.gridPatternColor"
					/>

					<template #connection-line="connectionLineProps">
						<ConnectionLine v-bind="connectionLineProps" />
					</template>
					<template #edge-default="edgeProps">
						<BaseEdge v-bind="edgeProps" />
					</template>

					<MiniMap
						pannable
						zoomable
					/>
				</VueFlow>

				<NodeContextMenu
					v-if="contextMenu.visible"
					:node-id="contextMenu.nodeId"
					:x="contextMenu.x"
					:y="contextMenu.y"
					@close="closeContextMenu"
				/>
				<ShapeSelectionDialog />
			</main>
			<!-- Right Panel: Properties -->
			<DesignRightPanel />
		</div>
	</div>
</template>
