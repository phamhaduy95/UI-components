import { ref } from 'vue';
import { useVueFlow } from '@vue-flow/core';
import type { OnResize, OnResizeStart } from '@vue-flow/node-resizer';
import type { GroupNodeData } from '@/modules/designer/types/Designer.type';
import { useHistory } from '@/modules/designer/composables/useHistory';
import { useNodeCommandFactory } from '@/modules/designer/composables/useCommandFactory';
import type { NodeSizeEntry } from '@/modules/designer/types/Command.type';

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
	const { createResizeNodesCommand } = useNodeCommandFactory();

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

		const { groupWidth, groupHeight, groupX, groupY, children } = groupResizeData.value;
		const groupNode = findNode(nodeId);

		const scaleX = width / groupWidth;
		const scaleY = height / groupHeight;

		const entries: NodeSizeEntry[] = [
			{
				nodeId,
				beforeStyle: { width: `${groupWidth}px`, height: `${groupHeight}px` },
				afterStyle: { width: `${width}px`, height: `${height}px` },
				beforePosition: { x: groupX, y: groupY },
				...(groupNode
					? { afterPosition: { x: groupNode.position.x, y: groupNode.position.y } }
					: {})
			},
			...children.map((child) => ({
				nodeId: child.id,
				beforeStyle: { width: `${child.width}px`, height: `${child.height}px` },
				afterStyle: { width: `${child.width * scaleX}px`, height: `${child.height * scaleY}px` },
				beforePosition: { x: child.x, y: child.y },
				afterPosition: { x: child.x * scaleX, y: child.y * scaleY }
			}))
		];

		commit(createResizeNodesCommand(entries));

		groupResizeData.value = null;
	};

	return {
		onResizeStart,
		onResize,
		onResizeEnd
	};
};
