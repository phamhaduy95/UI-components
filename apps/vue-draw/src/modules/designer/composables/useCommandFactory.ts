import { useVueFlow, type Edge } from '@vue-flow/core';

import type {
	EdgeBasicPropEntry,
	EdgeUpdateDataEntry,
	GroupEntry,
	NodeRotationEntry,
	NodeUpdateDataEntry,
	NodeUpdateEntry
} from '@/modules/designer/types/Command.type';
import type { DesignGraphNode } from '@/modules/designer/types/Node.type';

export const useNodeCommandFactory = () => {
	const {
		removeNodes,
		addNodes,
		updateNode,
		updateNodeData,
		addEdges,
		findEdge,
		removeEdges,
		updateEdgeData
	} = useVueFlow();

	const createAddEdgesCommand = (edges: Edge[]) => ({
		action: 'addEdge',
		timestamp: Date().toString(),
		revert: () => {
			removeEdges(edges);
		},
		forward: () => {
			addEdges(edges);
		}
	});

	const createDeleteEdgesCommand = (edges: Edge[]) => {
		return {
			action: 'deleteEdge',
			timestamp: Date().toString(),
			revert: () => {
				addEdges(edges);
			},
			forward: () => {
				removeEdges(edges);
			}
		};
	};

	const createDeleteMultipleEntitiesCommand = ({
		nodes,
		edges
	}: {
		nodes: DesignGraphNode[];
		edges: Edge[];
	}) => ({
		action: 'deleteMultipleEntities',
		timestamp: Date().toString(),
		revert: () => {
			addNodes(nodes);
			addEdges(edges);
		},
		forward: () => {
			removeNodes(nodes);
			removeEdges(edges);
		}
	});

	const createAddNodesCommand = (nodes: DesignGraphNode[]) => ({
		action: 'addNode',
		timestamp: Date().toString(),
		revert: () => {
			removeNodes(nodes);
		},
		forward: () => {
			addNodes(nodes);
		}
	});

	const createDeleteNodesCommand = (nodes: DesignGraphNode[]) => {
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

	const createUpdateNodesCommand = (entries: NodeUpdateEntry[]) => {
		return {
			action: 'updateNode',
			timestamp: Date().toString(),
			revert: () => {
				entries.forEach(({ nodeId, before }) => {
					updateNode(nodeId, before);
				});
			},
			forward: () => {
				entries.forEach(({ nodeId, after }) => {
					updateNode(nodeId, after);
				});
			}
		};
	};

	const createUpdateNodeDataCommand = (entries: NodeUpdateDataEntry[]) => {
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

	const createUpdateEdgeDataCommand = (entries: EdgeUpdateDataEntry[]) => {
		return {
			action: 'updateEdgeData',
			timestamp: Date().toString(),
			revert: () => {
				entries.forEach(({ edgeId, beforeData }) => {
					updateEdgeData(edgeId, beforeData);
				});
			},
			forward: () => {
				entries.forEach(({ edgeId, afterData }) => {
					updateEdgeData(edgeId, afterData);
				});
			}
		};
	};

	const createUpdateEdgeCommand = (entries: EdgeBasicPropEntry[]) => {
		return {
			action: 'updateEdge',
			timestamp: Date().toString(),
			revert: () => {
				entries.forEach(({ edgeId, beforeData }) => {
					const edge = findEdge(edgeId);
					if (edge) Object.assign(edge, beforeData);
				});
			},
			forward: () => {
				entries.forEach(({ edgeId, afterData }) => {
					const edge = findEdge(edgeId);
					if (edge) Object.assign(edge, afterData);
				});
			}
		};
	};

	return {
		createAddNodesCommand,
		createUpdateNodesCommand,
		createUpdateNodeDataCommand,
		createDeleteMultipleEntitiesCommand,
		createDeleteNodesCommand,
		createRotateNodesCommand,
		createGroupNodesCommand,
		createUngroupNodesCommand,
		createAddEdgesCommand,
		createDeleteEdgesCommand,
		createUpdateEdgeCommand,
		createUpdateEdgeDataCommand
	};
};
