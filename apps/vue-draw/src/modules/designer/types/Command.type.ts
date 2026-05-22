import type { DesignerNode } from '@/modules/designer/types/Designer.type';

export interface Command {
	action: string;
	timestamp: string;
	revert: () => void;
	forward: () => void;
}

export interface NodePositionEntry {
	nodeId: string;
	before: { x: number; y: number };
	after: { x: number; y: number };
}

export interface NodeRotationEntry {
	nodeId: string;
	beforeRotation: number;
	afterRotation: number;
	beforePosition?: { x: number; y: number };
	afterPosition?: { x: number; y: number };
}

export interface NodeSizeEntry {
	nodeId: string;
	beforeStyle: Record<string, string>;
	afterStyle: Record<string, string>;
	beforePosition?: { x: number; y: number };
	afterPosition?: { x: number; y: number };
}

export interface NodeDataEntry {
	nodeId: string;
	beforeData: DesignerNode['data'];
	afterData: DesignerNode['data'];
}

export interface ZIndexEntry {
	nodeId: string;
	before: number;
	after: number;
}

export interface GroupEntry {
	groupNode: DesignerNode;
	children: Array<{
		node: DesignerNode;
		relativePosition: { x: number; y: number };
		absolutePosition: { x: number; y: number };
	}>;
}
