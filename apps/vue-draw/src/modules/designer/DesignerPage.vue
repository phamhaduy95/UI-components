<script setup lang="ts">
	import { onMounted, onUnmounted, type ComponentInstance } from 'vue';

	import { Background } from '@vue-flow/background';
	import { VueFlow, type Connection, type Edge, type NodeComponent } from '@vue-flow/core';

	import { nodeConfigMap } from '@/modules/designer/constant/nodeConfig';
	import { NodeContextMenu } from './components/NodeContextMenu';
	import { DesignerLeftPanel, DesignerRightPanel, DesignerToolbar } from './layouts';

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

	import type { DesignerNode } from './types/Node.type';

	// We let vue-flow manage state of nodes and edges internally to reduce memory usage
	const initialNodes: Array<DesignerNode> = [];
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
	const { createAddEdgesCommand } = useNodeCommandFactory();
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
		const edge = generateEdge({
			...connection,
			type: 'default'
		});
		commit(createAddEdgesCommand([edge]));
	};
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
					:delete-key-code="null"
					@pane-click="closeContextMenu"
					@node-context-menu="onNodeContextMenu"
					@connect="onConnect"
					@edge-click="onEdgeClick"
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
				</VueFlow>
				<NodeContextMenu
					v-if="contextMenu.visible"
					:node-id="contextMenu.nodeId"
					:x="contextMenu.x"
					:y="contextMenu.y"
					@close="closeContextMenu"
				/>
			</main>
			<!-- Right Panel: Properties -->
			<DesignerRightPanel />
		</div>
	</div>
</template>
