import {
	NodeCategory,
	type BasicShapeNodeData,
	type DesignerNode,
	type DesignerNodeData,
	type GroupNodeData
} from '@/modules/designer/types/Node.type';
import { defaultNodeData, defaultGroupData } from '@/modules/designer/constant/default';

export const generateNodeId = () => `node_${crypto.randomUUID()}`;

type GenerateNodeArg = Omit<DesignerNode, 'id' | 'data'> & {
	data?: Partial<DesignerNodeData>;
};

export const generateNode = ({ data, ...rest }: GenerateNodeArg) => {
	switch (data?.category) {
		case NodeCategory.BasicShape:
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultNodeData, ...data } as BasicShapeNodeData
			} as DesignerNode;
		case NodeCategory.Group:
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultGroupData, ...data } as GroupNodeData
			} as DesignerNode;
		default:
			throw new Error(`Unknown node category: ${data?.category}`);
	}
};
