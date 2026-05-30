import type { Edge } from '@vue-flow/core';
import type { DesignerEdge, EdgeData } from '@/modules/designer/types/Edge.type';
import { defaultEdgeData } from '@/modules/designer/constant/default';

export const generateEdgeId = () => `edge_${crypto.randomUUID()}`;

type GenerateEdgeArg = Omit<Edge<EdgeData>, 'id' | 'data'> & {
	data?: Partial<EdgeData>;
};

export const generateEdge = ({ data, ...rest }: GenerateEdgeArg) => {
	return {
		...rest,
		id: generateEdgeId(),
		data: { ...defaultEdgeData, ...data } as EdgeData
	} as DesignerEdge;
};
