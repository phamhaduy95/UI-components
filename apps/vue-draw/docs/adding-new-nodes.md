# How to Add a New Node

Adding a new drag-and-drop node to the `vue-draw` designer involves a standardized workflow. This guide walks you through creating a new node from scratch.

## 1. Create the Palette SVG Icon

First, create an SVG icon that will represent your node in the left-hand palette.

- Save the SVG in the appropriate folder under `src/assets/palettes/` (e.g., `basic-shapes/`, `industrial/`, `form-fields/`, `data-display/`).
- **Important**: To ensure your SVG strokes don't distort when the node is scaled on the canvas, ensure your SVG includes the `scada-icon` class which applies `vector-effect: non-scaling-stroke`.

Example (`src/assets/palettes/basic-shapes/my-shape.svg`):

```xml
<svg class="scada-icon" viewBox="0 0 102 102" xmlns="http://www.w3.org/2000/svg">
  <polygon points="..."></polygon>
</svg>
```

## 2. Define the Node Type

Register your new node type in the global `NodeType` enum.
**File:** `src/modules/designer/types/Node.type.ts`

```typescript
export enum NodeType {
	// ... existing types
	MyShape = 'myShape'
}
```

## 3. Create the Node Components

Create a new directory for your node under `src/modules/designer/components/Nodes/` in the appropriate category folder (e.g., `BasicShapeNodes/MyShapeNode/`). Inside this folder, you will need three files:

### A. The Palette Component (`MyShapePalette.vue`)

This defines how the node looks in the drag-and-drop sidebar.

```vue
<script setup lang="ts">
import {
	BaseNodePalette,
	type BaseNodePaletteProps
} from '@/modules/designer/components/Nodes/BaseNode';
import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';
import IconMyShape from '@/assets/palettes/basic-shapes/my-shape.svg';

const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette v-bind="props" :category="NodeCategory.BasicShape" :type="NodeType.MyShape">
		<template #icon>
			<IconMyShape />
		</template>
	</BaseNodePalette>
</template>
```

### B. The Canvas Node Component (`MyShapeNode.vue`)

This defines how the node is rendered and interacted with on the Vue Flow canvas. You must compute the SVG path for the actual shape geometry, as well as the connector (snap) points for edges.

```vue
<script setup lang="ts">
import { computed } from 'vue';
import {
	BaseCanvasNode,
	type BaseCanvasNodeProps,
	BaseNodeConnector
} from '@/modules/designer/components/Nodes/BaseNode';
import type { BasicShapeNodeData } from '@/modules/designer/types/Node.type';
import { Position } from '@vue-flow/core';

const props = defineProps<BaseCanvasNodeProps>();
const nodeConfig = computed(() => props.data as BasicShapeNodeData);

// Define your scalable SVG path logic here based on props.dimensions
const path = computed(() => `...`);

// Define logic for calculating where edges snap to this shape perimeter
const connectors = computed(() => [
	// e.g. { position: Position.Top, offsetDistance: '...' }
]);
</script>

<template>
	<BaseCanvasNode v-bind="props">
		<template #default="{ shapeHeight, shapeWidth }">
			<!-- Your scalable shape rendering -->
			<svg :viewBox="`0 0 ${shapeWidth} ${shapeHeight}`" overflow="visible">
				<!-- ... shape elements ... -->
			</svg>
		</template>
		<template #connector="connectorProps">
			<BaseNodeConnector :path="path" v-bind="connectorProps" :connectors="connectors" />
		</template>
	</BaseCanvasNode>
</template>
```

### C. The Local Index (`index.ts`)

Export the components for easy importing elsewhere in the application.

```typescript
export { default as MyShapeNode } from './MyShapeNode.vue';
export { default as MyShapePalette } from './MyShapePalette.vue';
```

## 4. Export the Node Globally

Add an export for your new node directory in the corresponding category index.
**File:** `src/modules/designer/components/Nodes/BasicShapeNodes/index.ts` (or `DataDisplayNodes/index.ts`, etc.)

```typescript
export * from './MyShapeNode';
```

## 5. Register the Node Configuration

Register the node in the designer's central configuration map so the application knows how to instantiate it when dropped onto the canvas.
**File:** `src/modules/designer/constant/nodeConfig.ts`

```typescript
import { MyShapeNode, MyShapePalette } from '@/modules/designer/components';

// Add to the appropriate category record (e.g., BasicShapeTypes, DataDisplayTypes)
const BasicShapeTypes: Record<string, NodeTypeConfig> = {
	// ...
	[NodeType.MyShape]: {
		id: NodeType.MyShape,
		category: NodeCategory.BasicShape,
		type: NodeType.MyShape,
		paletteComponent: markRaw(MyShapePalette),
		nodeComponent: markRaw(MyShapeNode),
		label: 'My Shape'
	}
};
```

## 6. Add Node Initialization Logic

Finally, you must define the default data and dimensions for your node when it is first generated.
**File:** `src/modules/designer/utils/node.utils.ts`

```typescript
export const generateNode = ({ data, dimensions, ...rest }: GenerateNodeArg) => {
	switch (data?.category) {
		case NodeCategory.BasicShape: {
			// ...
			switch (rest.type) {
				case NodeType.MyShape:
					return {
						...rest,
						id: generateNodeId(),
						data: { ...defaultNodeData, ...data } as BasicShapeNodeData,
						dimensions: dimensions ?? { width: 120, height: 120 }
					} as DesignGraphNode;
				// ...
			}
		}
	}
};
```

Once registered and initialized, your new node will automatically appear in the designer palette, support drag-and-drop, and hook directly into the canvas engine!
