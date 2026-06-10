import {
	NodeCategory,
	NodeType,
	type TableNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { TableNode, TablePalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const TableNodeConfig: Record<NodeType.Table, NodeConfiguration<TableNodeData>> = {
	[NodeType.Table]: {
		id: NodeType.Table,
		category: NodeCategory.DataDisplay,
		type: NodeType.Table,
		label: 'Table',
		paletteComponent: markRaw(TablePalette),
		nodeComponent: markRaw(TableNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultBasicShapeNodeData, ...data },
				dimensions: dimensions ?? { width: 400, height: 0 },
				style: { width: 'max-content', height: 'max-content' }
			} as DesignGraphNode<TableNodeData>;
		}
	}
};
