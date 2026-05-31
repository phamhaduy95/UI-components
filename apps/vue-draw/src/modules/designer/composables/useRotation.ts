import { computed, ref } from 'vue';
import { useVueFlow, type GraphNode } from '@vue-flow/core';
import { NodeCategory, type GroupNodeData } from '@/modules/designer/types/Node.type';
import { useHistory } from '@/modules/designer/composables/useHistory';
import { useNodeCommandFactory } from '@/modules/designer/composables/useCommandFactory';
import type { NodeRotationEntry } from '@/modules/designer/types/Command.type';

export const useRotation = (nodeId: string) => {
	const { updateNodeData, getSelectedNodes, findNode, updateNodeInternals, getNodes, updateNode } =
		useVueFlow();
	const { commit } = useHistory();
	const { createRotateNodesCommand } = useNodeCommandFactory();
	const nodeRef = ref<HTMLElement | null>(null);

	const canRotate = computed(() => getSelectedNodes.value.length === 1);

	const handleGroupRotation = (groupNode: GraphNode<GroupNodeData>, absoluteAngle: number) => {
		const children = getNodes.value.filter((n) => n.parentNode === nodeId);

		const initialRotation = groupNode.data?.rotation || 0;
		const groupWidth = groupNode.dimensions.width;
		const groupHeight = groupNode.dimensions.height;
		const groupCenterX = groupWidth / 2;
		const groupCenterY = groupHeight / 2;

		const initialChildrenState = children.map((child) => {
			return {
				id: child.id,
				startX: child.position.x,
				startY: child.position.y,
				width: child.dimensions.width,
				height: child.dimensions.height,
				startRotation: child.data?.rotation || 0
			};
		});

		const deltaAngle = absoluteAngle - initialRotation;

		const rad = (deltaAngle * Math.PI) / 180;
		const cosA = Math.cos(rad);
		const sinA = Math.sin(rad);

		for (const child of initialChildrenState) {
			const childCenterX = child.startX + child.width / 2;
			const childCenterY = child.startY + child.height / 2;

			const deltaX = childCenterX - groupCenterX;
			const deltaY = childCenterY - groupCenterY;

			const rotatedDeltaX = deltaX * cosA - deltaY * sinA;
			const rotatedDeltaY = deltaX * sinA + deltaY * cosA;

			const newX = groupCenterX + rotatedDeltaX - child.width / 2;
			const newY = groupCenterY + rotatedDeltaY - child.height / 2;

			const newChildRotation = child.startRotation + deltaAngle;

			updateNode(child.id, {
				position: { x: newX, y: newY }
			});

			updateNodeData(child.id, { rotation: newChildRotation });
		}

		updateNodeData(nodeId, { rotation: absoluteAngle });
		updateNodeInternals([nodeId, ...children.map((child) => child.id)]);
	};

	const handleSingleNodeRotation = (absoluteAngle: number) => {
		updateNodeData(nodeId, { rotation: absoluteAngle });
		updateNodeInternals([nodeId]);
	};

	const onRotateMouseDown = (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (!nodeRef.value) return;

		const targetNode = findNode(nodeId);
		if (!targetNode) return;

		const isGroup = targetNode.type === NodeCategory.Group;

		const rect = nodeRef.value.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const rotationEntries: NodeRotationEntry[] = [
			{
				nodeId,
				beforeRotation: targetNode.data.rotation,
				afterRotation: 0,
				beforePosition: { x: targetNode.position.x, y: targetNode.position.y },
				afterPosition: undefined
			}
		];

		if (isGroup) {
			const children = getNodes.value.filter((n) => n.parentNode === nodeId);
			for (const child of children) {
				rotationEntries.push({
					nodeId: child.id,
					beforeRotation: child.data.rotation,
					afterRotation: 0,
					beforePosition: { x: child.position.x, y: child.position.y },
					afterPosition: undefined
				});
			}
		}

		const onMouseMove = (moveEvent: MouseEvent) => {
			const dx = moveEvent.clientX - centerX;
			const dy = moveEvent.clientY - centerY;
			const absoluteAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

			if (isGroup) return handleGroupRotation(targetNode, absoluteAngle);
			handleSingleNodeRotation(absoluteAngle);
		};

		const onMouseUp = () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);

			if (rotationEntries) {
				const updatedNode = findNode(nodeId);
				const entries: NodeRotationEntry[] = rotationEntries.map((entry) => {
					if (entry.nodeId === nodeId) {
						return {
							...entry,
							afterRotation: (updatedNode?.data as { rotation?: number } | undefined)?.rotation ?? 0
						};
					}
					const childNode = findNode(entry.nodeId);
					return {
						...entry,
						afterRotation: (childNode?.data as { rotation?: number } | undefined)?.rotation ?? 0,
						afterPosition: childNode
							? { x: childNode.position.x, y: childNode.position.y }
							: undefined
					};
				});

				commit(createRotateNodesCommand(entries));
			}
		};

		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	};

	return {
		nodeRef,
		onRotateMouseDown,
		canRotate
	};
};
