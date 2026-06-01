import { useHistory } from '@/modules/designer/composables/useHistory';
import { useNodeCommandFactory } from '@/modules/designer/composables/useCommandFactory';
import type { DesignGraphNode } from '@/modules/designer/types/Node.type';
import { generateNodeId } from '@/modules/designer/utils/node.utils';

export const useNodeCreation = () => {
	const { commit } = useHistory();
	const { createAddNodesCommand, createDeleteNodesCommand } = useNodeCommandFactory();

	const createNodes = (nodes: DesignGraphNode[]) => {
		if (!nodes.length) return;
		commit(createAddNodesCommand(nodes));
	};

	const removeNodes = (nodes: DesignGraphNode[]) => {
		if (!nodes.length) return;

		commit(createDeleteNodesCommand(nodes));
	};

	const cloneNodes = (nodes: DesignGraphNode[]) => {
		if (!nodes.length) return [];

		const newNodes: DesignGraphNode[] = nodes.map((node) => {
			return {
				...(JSON.parse(JSON.stringify(node)) as DesignGraphNode),
				id: generateNodeId()
			};
		});

		return newNodes;
	};

	return {
		createNodes,
		removeNodes,
		cloneNodes
	};
};
