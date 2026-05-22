import { useVueFlow } from '@vue-flow/core';
import type { DesignerNode } from '@/modules/designer/types/Designer.type';
import type {
	NodeRotationEntry,
	NodePositionEntry,
	NodeSizeEntry,
	GroupEntry,
	NodeDataEntry
} from '@/modules/designer/types/Command.type';

export const useNodeCommandFactory = () => {
	const { removeNodes, addNodes, updateNode, updateNodeData } = useVueFlow();

	const createAddNodesCommand = (nodes: DesignerNode[]) => ({
		action: 'addNode',
		timestamp: Date().toString(),
		revert: () => {
			removeNodes(nodes);
		},
		forward: () => {
			addNodes(nodes);
		}
	});

	const createDeleteNodesCommand = (nodes: DesignerNode[]) => {
		return {
			action: 'deleteNode',
			timestamp: Date().toString(),
			revert: () => {
				addNodes(nodes);
			},
			forward: () => {
				removeNodes(nodes);
			}
		};
	};

	const createRotateNodesCommand = (entries: NodeRotationEntry[]) => {
		return {
			action: 'rotateNode',
			timestamp: Date().toString(),
			revert: () => {
				entries.forEach(({ nodeId, beforeRotation, beforePosition }) => {
					updateNodeData(nodeId, { rotation: beforeRotation });
					if (beforePosition) updateNode(nodeId, { position: beforePosition });
				});
			},
			forward: () => {
				entries.forEach(({ nodeId, afterRotation, afterPosition }) => {
					updateNodeData(nodeId, { rotation: afterRotation });
					if (afterPosition) updateNode(nodeId, { position: afterPosition });
				});
			}
		};
	};

	const createRepositionNodesCommand = (entries: NodePositionEntry[]) => {
		return {
			action: 'repositionNode',
			timestamp: Date().toString(),
			revert: () => {
				entries.forEach(({ nodeId, before }) => {
					updateNode(nodeId, { position: before });
				});
			},
			forward: () => {
				entries.forEach(({ nodeId, after }) => {
					updateNode(nodeId, { position: after });
				});
			}
		};
	};

	const createResizeNodesCommand = (entries: NodeSizeEntry[]) => {
		return {
			action: 'resizeNodes',
			timestamp: Date().toString(),
			revert: () => {
				entries.forEach(({ nodeId, beforeStyle, beforePosition }) => {
					updateNode(nodeId, {
						style: beforeStyle,
						...(beforePosition ? { position: beforePosition } : {})
					});
				});
			},
			forward: () => {
				entries.forEach(({ nodeId, afterStyle, afterPosition }) => {
					updateNode(nodeId, {
						style: afterStyle,
						...(afterPosition ? { position: afterPosition } : {})
					});
				});
			}
		};
	};

	const createGroupNodesCommand = (entry: GroupEntry) => {
		return {
			action: 'groupNodes',
			timestamp: Date().toString(),
			revert: () => {
				// Dissolve: restore children to absolute positions, remove group
				entry.children.forEach(({ node, absolutePosition }) => {
					updateNode(node.id, { parentNode: undefined, position: absolutePosition });
				});
				removeNodes([entry.groupNode]);
			},
			forward: () => {
				// Re-group: add group node, re-parent children with relative positions
				addNodes([entry.groupNode]);
				entry.children.forEach(({ node, relativePosition }) => {
					updateNode(node.id, {
						parentNode: entry.groupNode.id,
						position: relativePosition
					});
				});
			}
		};
	};

	const createUngroupNodesCommand = (entry: GroupEntry) => {
		return {
			action: 'ungroupNodes',
			timestamp: Date().toString(),
			revert: () => {
				// Re-group
				addNodes([entry.groupNode]);
				entry.children.forEach(({ node, relativePosition }) => {
					updateNode(node.id, {
						parentNode: entry.groupNode.id,
						position: relativePosition
					});
				});
			},
			forward: () => {
				// Dissolve
				entry.children.forEach(({ node, absolutePosition }) => {
					updateNode(node.id, { parentNode: undefined, position: absolutePosition });
				});
				removeNodes([entry.groupNode]);
			}
		};
	};

	const createUpdateNodeDataCommand = (entries: NodeDataEntry[]) => {
		return {
			action: 'updateNodeData',
			timestamp: Date().toString(),
			revert: () => {
				entries.forEach(({ nodeId, beforeData }) => {
					updateNode(nodeId, { data: beforeData });
				});
			},
			forward: () => {
				entries.forEach(({ nodeId, afterData }) => {
					updateNode(nodeId, { data: afterData });
				});
			}
		};
	};

	return {
		createAddNodesCommand,
		createDeleteNodesCommand,
		createRotateNodesCommand,
		createRepositionNodesCommand,
		createResizeNodesCommand,
		createGroupNodesCommand,
		createUngroupNodesCommand,
		createUpdateNodeDataCommand
	};
};
