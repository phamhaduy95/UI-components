import { useHistory } from '@/modules/designer/composables/useHistory';
import { useNodeCommandFactory } from '@/modules/designer/composables/useCommandFactory';
import { generateEdgeId } from '@/modules/designer/utils/edge.utils';
import type { DesignerEdge } from '@/modules/designer/types/Edge.type';
import { toRaw } from 'vue';

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
				id: generateEdgeId(),
				type: edge.type,
				source: edge.source,
				target: edge.target,
				sourceHandle: edge.sourceHandle,
				targetHandle: edge.targetHandle,
				data: structuredClone(toRaw(edge.data)),
				style: structuredClone(toRaw(edge.style)),
				hidden: edge.hidden,
				animated: edge.animated,
				updatable: edge.updatable,
				selectable: edge.selectable,
				label: edge.label
			} as DesignerEdge;
		});

		return newEdges;
	};

	return {
		createEdges,
		removeEdges,
		cloneEdges
	};
};
