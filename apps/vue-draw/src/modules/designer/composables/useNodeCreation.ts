import { useHistory } from '@/modules/designer/composables/useHistory';
import { useNodeCommandFactory } from '@/modules/designer/composables/useCommandFactory';
import type { DesignerNode } from '@/modules/designer/types/Node.type';
import { generateNodeId } from '@/modules/designer/utils/node.utils';

export const useNodeCreation = () => {
	const { commit } = useHistory();
	const { createAddNodesCommand, createDeleteNodesCommand } = useNodeCommandFactory();

	const createNodes = (nodes: DesignerNode[]) => {
		if (!nodes.length) return;
		commit(createAddNodesCommand(nodes));
	};

	const removeNodes = (nodes: DesignerNode[]) => {
		if (!nodes.length) return;

		commit(createDeleteNodesCommand(nodes));
	};

	const cloneNodes = (nodes: DesignerNode[]) => {
		if (!nodes.length) return [];

		const newNodes: DesignerNode[] = nodes.map((node) => {
			return {
				...(JSON.parse(JSON.stringify(node)) as DesignerNode),
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
