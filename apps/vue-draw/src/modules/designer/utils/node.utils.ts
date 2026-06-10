import { type DesignGraphNode, type GenerateNodeArg } from '@/modules/designer/types/Node.type';
import { nodeConfigMap } from '@/modules/designer/constant/nodeConfig';

export const generateNodeId = () => `node_${crypto.randomUUID()}`;

export const generateNode = ({ data, dimensions, ...rest }: GenerateNodeArg) => {
	const config = nodeConfigMap[rest.type as string];
	if (!config) {
		throw new Error(`Unknown node type: ${rest.type}`);
	}
	return config.createNode({ data, dimensions, ...rest }) as DesignGraphNode;
};
