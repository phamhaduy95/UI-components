import {
	NodeCategory,
	NodeType,
	type GroupNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { GroupNode } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultGroupData } from '@/modules/designer/constant/default';

export const GroupNodeConfig: Record<NodeType.Group, NodeConfiguration<GroupNodeData>> = {
	[NodeType.Group]: {
		id: NodeType.Group,
		category: NodeCategory.Group,
		type: NodeType.Group,
		label: 'Group',

		nodeComponent: markRaw(GroupNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultGroupData, ...data },
				dimensions: dimensions ?? { width: 100, height: 100 }
			} as DesignGraphNode<GroupNodeData>;
		}
	}
};
