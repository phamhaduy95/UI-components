import { useVueFlow } from '@vue-flow/core';
import { ref } from 'vue';

import type { OnResize, OnResizeStart } from '@vue-flow/node-resizer';

import { useNodeCommandFactory } from '@/modules/designer/composables/useCommandFactory';
import { useHistory } from '@/modules/designer/composables/useHistory';

import type { NodeUpdateEntry } from '@/modules/designer/types/Command.type';
import type { GroupNodeData } from '@/modules/designer/types/Node.type';

export interface ChildSnapshot {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
}

export const useGroupResize = (nodeId: string) => {
	const { getNodes, updateNode, findNode } = useVueFlow();
	const { commit } = useHistory();
	const { createUpdateNodesCommand } = useNodeCommandFactory();

	const groupResizeData = ref<{
		groupWidth: number;
		groupHeight: number;
		groupX: number;
		groupY: number;
		children: ChildSnapshot[];
	} | null>(null);

	const onResizeStart: (e: OnResizeStart) => void = () => {
		const currentChildren = getNodes.value.filter((n) => n.parentNode === nodeId);
		const groupNode = findNode(nodeId);

		groupResizeData.value = {
			groupWidth:
				groupNode?.dimensions.width || (groupNode?.data as GroupNodeData)?.initialWidth || 200,
			groupHeight:
				groupNode?.dimensions.height || (groupNode?.data as GroupNodeData)?.initialHeight || 200,
			groupX: groupNode?.position.x || 0,
			groupY: groupNode?.position.y || 0,
			children: currentChildren.map((child) => ({
				id: child.id,
				x: child.position.x,
				y: child.position.y,
				width: child.dimensions.width,
				height: child.dimensions.height
			}))
		};
	};

	const onResize: (e: OnResize) => void = ({ params: { width, height } }) => {
		if (!groupResizeData.value) return;

		const { groupWidth, groupHeight, children } = groupResizeData.value;

		const scaleX = width / groupWidth;
		const scaleY = height / groupHeight;

		children.forEach((child) => {
			updateNode(child.id, {
				position: {
					x: child.x * scaleX,
					y: child.y * scaleY
				},
				style: {
					width: `${child.width * scaleX}px`,
					height: `${child.height * scaleY}px`
				}
			});
		});
	};

	const onResizeEnd: (e: OnResizeStart) => void = (event) => {
		const { params } = event as unknown as OnResize;
		const { width, height } = params;

		if (!groupResizeData.value) return;

		const { groupWidth, groupHeight, children } = groupResizeData.value;

		const scaleX = width / groupWidth;
		const scaleY = height / groupHeight;

		const entries: NodeUpdateEntry[] = [
			{
				nodeId,
				before: { dimensions: { width: groupWidth, height: groupHeight } },
				after: { dimensions: { width: width, height: height } }
			},
			...children.map((child) => ({
				nodeId: child.id,
				before: {
					position: { x: child.x, y: child.y },
					dimensions: { width: child.width, height: child.height }
				},
				after: {
					position: { x: child.x * scaleX, y: child.y * scaleY },
					dimensions: { width: child.width * scaleX, height: child.height * scaleY }
				}
			}))
		];

		commit(createUpdateNodesCommand(entries));

		groupResizeData.value = null;
	};

	return {
		onResizeStart,
		onResize,
		onResizeEnd
	};
};
