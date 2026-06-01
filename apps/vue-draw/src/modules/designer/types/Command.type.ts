import type { DesignGraphNode, DesignerNodeData } from '@/modules/designer/types/Node.type';
import type { DesignerEdge, EdgeData } from './Edge.type';
import type { GraphNode, XYPosition } from '@vue-flow/core';

export interface Command {
	action: string;
	timestamp: string;
	revert: () => void;
	forward: () => void;
}

export interface NodeRotationEntry {
	nodeId: string;
	beforeRotation: number;
	afterRotation: number;
	beforePosition?: XYPosition;
	afterPosition?: XYPosition;
}

export interface NodeDataEntry {
	nodeId: string;
	beforeData: DesignGraphNode['data'];
	afterData: DesignGraphNode['data'];
}

export interface ZIndexEntry {
	nodeId: string;
	before: number;
	after: number;
}

export interface GroupEntry {
	groupNode: DesignGraphNode;
	children: Array<{
		node: DesignGraphNode;
		relativePosition: XYPosition;
		absolutePosition: XYPosition;
	}>;
}

export type ConfigurableNodeProps = Partial<
	Pick<GraphNode, 'style' | 'dimensions' | 'zIndex' | 'position'>
>;

export interface NodeUpdateEntry {
	nodeId: string;
	before: ConfigurableNodeProps;
	after: ConfigurableNodeProps;
}
export interface NodeUpdateDataEntry {
	nodeId: string;
	beforeData: DesignerNodeData;
	afterData: DesignerNodeData;
}

export interface EdgeUpdateDataEntry {
	edgeId: string;
	beforeData: EdgeData;
	afterData: EdgeData;
}

export type ConfigurableEdgeProps = Partial<Pick<DesignerEdge, 'type' | 'label'>>;

export interface EdgeBasicPropEntry {
	edgeId: string;
	beforeData: ConfigurableEdgeProps;
	afterData: ConfigurableEdgeProps;
}
