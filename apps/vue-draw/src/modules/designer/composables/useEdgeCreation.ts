import { useHistory } from '@/modules/designer/composables/useHistory';
import { useNodeCommandFactory } from '@/modules/designer/composables/useCommandFactory';
import { generateEdgeId } from '@/modules/designer/utils/edge.utils';
import type { DesignerEdge } from '@/modules/designer/types/Edge.type';

export const useEdgeCreation = () => {
	const { commit } = useHistory();
	const { createAddEdgesCommand, createDeleteEdgesCommand } = useNodeCommandFactory();

	const createEdges = (edges: DesignerEdge[]) => {
		if (!edges.length) return;
		commit(createAddEdgesCommand(edges));
	};

	const removeEdges = (edges: DesignerEdge[]) => {
		if (!edges.length) return;
		commit(createDeleteEdgesCommand(edges));
	};

	const cloneEdges = (edges: DesignerEdge[]) => {
		if (!edges.length) return [];

		const newEdges: DesignerEdge[] = edges.map((edge) => {
			return {
				...(JSON.parse(JSON.stringify(edge)) as DesignerEdge),
				id: generateEdgeId()
			};
		});

		return newEdges;
	};

	return {
		createEdges,
		removeEdges,
		cloneEdges
	};
};
