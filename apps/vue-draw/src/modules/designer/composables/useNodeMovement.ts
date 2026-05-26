import { useHistory } from '@/modules/designer/composables/useHistory';
import { useNodeCommandFactory } from '@/modules/designer/composables/useCommandFactory';
import { useVueFlow, type NodeDragEvent, type XYPosition } from '@vue-flow/core';
import type { NodeUpdateEntry } from '@/modules/designer/types/Command.type';

export const useNodeMovement = () => {
	const { commit } = useHistory();
	const { createUpdateNodesCommand } = useNodeCommandFactory();
	const { findNode, getSelectedNodes } = useVueFlow();

	const beforePositions = new Map<string, XYPosition>();

	const onNodeDragStart = (event: NodeDragEvent) => {
		const { nodes, node } = event;
		const targets =
			nodes && nodes.length > 0
				? nodes
				: getSelectedNodes.value.length > 0
					? getSelectedNodes.value
					: [node];

		targets.forEach((n) => {
			if (!beforePositions.has(n.id)) {
				beforePositions.set(n.id, { x: n.position.x, y: n.position.y });
			}
		});
	};

	const isPositionEqual = (before: XYPosition, after: XYPosition) => {
		return before.x === after.x && before.y === after.y;
	};

	const onNodeDragStop = () => {
		const entries: NodeUpdateEntry[] = [];
		beforePositions.forEach((beforePosition, nodeId) => {
			const node = findNode(nodeId);
			if (!node) return;
			const afterPosition = node.position;
			if (!isPositionEqual(beforePosition, afterPosition)) {
				entries.push({
					nodeId,
					before: { position: beforePosition },
					after: { position: afterPosition }
				});
			}
		});

		if (entries.length > 0) {
			commit(createUpdateNodesCommand(entries));
		}
		beforePositions.clear();
	};

	return {
		onNodeDragStart,
		onNodeDragStop
	};
};
