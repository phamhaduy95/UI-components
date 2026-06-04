# How to Add a New Node

Adding a new drag-and-drop node to the `vue-draw` designer involves a standardized workflow. This guide walks you through creating a new node from scratch.

## 1. Create the Palette SVG Icon

First, create an SVG icon that will represent your node in the left-hand palette.

- Save the SVG in the appropriate folder under `src/assets/palettes/` (e.g., `basic-shapes/`, `AOGs/`, `form-fields/`).
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

Create a new directory for your node under `src/modules/designer/components/Nodes/` (e.g., `MyShapeNode/`). Inside this folder, you will need three files:

### A. The Palette Component (`MyShapePalette.vue`)

This defines how the node looks in the drag-and-drop sidebar.

```vue
<script setup lang="ts">
import { GenericNodePalette, type GenericNodePaletteProps } from '../GenericNode';
import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';
import IconMyShape from '@/assets/palettes/basic-shapes/my-shape.svg';

const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette v-bind="props" :category="NodeCategory.BasicShape" :type="NodeType.MyShape">
		<template #icon>
			<IconMyShape />
		</template>
	</GenericNodePalette>
</template>
```

### B. The Canvas Node Component (`MyShapeNode.vue`)

This defines how the node is rendered and interacted with on the Vue Flow canvas. You must compute the SVG path for the actual shape geometry, as well as the connector (snap) points for edges.

```vue
<script setup lang="ts">
import { computed } from 'vue';
import {
	GenericCanvasNode,
	type GenericCanvasNodeProps,
	GenericNodeConnector
} from '../GenericNode';
import type { BasicShapeNodeData } from '@/modules/designer/types/Node.type';
import { Position } from '@vue-flow/core';

const props = defineProps<GenericCanvasNodeProps>();
const nodeConfig = computed(() => props.data as BasicShapeNodeData);

// Define your scalable SVG path logic here based on props.dimensions
const path = computed(() => `...`);

// Define logic for calculating where edges snap to this shape perimeter
const connectors = computed(() => [
	// e.g. { position: Position.Top, offsetDistance: '...' }
]);
</script>

<template>
	<GenericCanvasNode v-bind="props">
		<template #default="{ shapeHeight, shapeWidth }">
			<!-- Your scalable shape rendering -->
			<svg :viewBox="`0 0 ${shapeWidth} ${shapeHeight}`" overflow="visible">
				<!-- ... shape elements ... -->
			</svg>
		</template>
		<template #connector="connectorProps">
			<GenericNodeConnector :path="path" v-bind="connectorProps" :connectors="connectors" />
		</template>
	</GenericCanvasNode>
</template>
```

### C. The Local Index (`index.ts`)

Export the components for easy importing elsewhere in the application.

```typescript
export { default as MyShapeNode } from './MyShapeNode.vue';
export { default as MyShapePalette } from './MyShapePalette.vue';
```

## 4. Export the Node Globally

Add an export for your new node directory in the global Nodes index.
**File:** `src/modules/designer/components/Nodes/index.ts`

```typescript
export * from './MyShapeNode';
```

## 5. Register the Node Configuration

Finally, register the node in the designer's central configuration map so the application knows how to instantiate it when dropped onto the canvas.
**File:** `src/modules/designer/constant/nodeConfig.ts`

```typescript
import { MyShapeNode, MyShapePalette } from '@/modules/designer/components';

// Add to the appropriate category record (e.g., BasicShapeTypes, IndustrialEquipmentTypes)
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

Once registered, your new node will automatically appear in the designer palette, support drag-and-drop, and hook directly into the canvas engine!
