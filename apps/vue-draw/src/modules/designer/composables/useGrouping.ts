import { getRectOfNodes, useVueFlow } from '@vue-flow/core';
import { computed } from 'vue';

import { useNodeCommandFactory } from '@/modules/designer/composables/useCommandFactory';
import { useHistory } from '@/modules/designer/composables/useHistory';
import { defaultGroupData } from '@/modules/designer/constant/default';
import type { GroupEntry } from '@/modules/designer/types/Command.type';
import {
	NodeCategory,
	type DesignGraphNode,
	type GroupNodeData
} from '@/modules/designer/types/Node.type';
import { generateNode } from '@/modules/designer/utils/node.utils';

export const useGrouping = () => {
	const {
		getSelectedNodes,
		getNodes,
		findNode,
		removeSelectedNodes,
		addSelectedNodes,
		removeNodes
	} = useVueFlow();

	const { commit } = useHistory();
	const { createGroupNodesCommand, createUngroupNodesCommand } = useNodeCommandFactory();

	const canUngroup = computed(() =>
		getSelectedNodes.value.some((n) => n.type === NodeCategory.Group)
	);

	const canGroup = computed(() => getSelectedNodes.value.length >= 2);

	const isGroupSelected = (groupId: string) => {
		const isGroupNodeSelected = getSelectedNodes.value.some(
			(node) => node.id === groupId && node.selected
		);

		if (isGroupNodeSelected) return true;

		const isAnyChildSelected = getSelectedNodes.value.some((node) => node.parentNode === groupId);

		return isAnyChildSelected;
	};

	const groupSelectedNodes = () => {
		const selected = getSelectedNodes.value.filter((node) => node.parentNode === undefined);

		if (selected.length < 2) return;

		const groupBounds = getRectOfNodes(selected);

		const groupX = groupBounds.x;
		const groupY = groupBounds.y;
		const groupWidth = groupBounds.width;
		const groupHeight = groupBounds.height;

		const groupData: GroupNodeData = {
			category: NodeCategory.Group,
			initialWidth: groupWidth,
			initialHeight: groupHeight,
			rotation: defaultGroupData.rotation
		};

		const newGroupNode = generateNode({
			type: NodeCategory.Group,
			position: { x: groupX, y: groupY },
			style: { width: `${groupWidth}px`, height: `${groupHeight}px` },
			data: groupData,
			dimensions: { width: groupWidth, height: groupHeight }
		});

		const groupId = newGroupNode.id;

		const childEntries: GroupEntry['children'] = [];

		for (const childNode of selected) {
			const relativePosition = {
				x: childNode.position.x - groupBounds.x,
				y: childNode.position.y - groupBounds.y
			};
			childEntries.push({
				node: { ...childNode } as DesignGraphNode,
				relativePosition,
				absolutePosition: { x: childNode.position.x, y: childNode.position.y }
			});
		}

		commit(
			createGroupNodesCommand({
				groupNode: newGroupNode as DesignGraphNode,
				children: childEntries
			})
		);

		// automatically select group node when created
		const groupNode = findNode(groupId);

		removeSelectedNodes(selected);

		if (groupNode) {
			addSelectedNodes([groupNode]);
		}
	};

	const removeEntireGroup = (groupId: string) => {
		const allNodes = getNodes.value;
		const nodesToRemove = allNodes.filter((n) => n.id === groupId || n.parentNode === groupId);
		removeNodes(nodesToRemove);
	};

	const removeGroupNode = (groupNode: DesignGraphNode) => {
		const allNodes = getNodes.value;
		const groupAbsoluteX = groupNode.position.x;
		const groupAbsoluteY = groupNode.position.y;

		const children = allNodes.filter((n) => n.parentNode === groupNode.id);
		const childEntries: GroupEntry['children'] = [];

		for (const childNode of children) {
			const absolutePosition = {
				x: groupAbsoluteX + childNode.position.x,
				y: groupAbsoluteY + childNode.position.y
			};
			childEntries.push({
				node: { ...childNode } as DesignGraphNode,
				relativePosition: { x: childNode.position.x, y: childNode.position.y },
				absolutePosition
			});
		}

		commit(
			createUngroupNodesCommand({
				groupNode: { ...groupNode } as DesignGraphNode,
				children: childEntries
			})
		);
	};

	const ungroup = () => {
		const selectedGroups = getSelectedNodes.value.filter((n) => n.type === NodeCategory.Group);

		for (const groupNode of selectedGroups) {
			removeGroupNode(groupNode);
		}
	};

	return {
		groupSelectedNodes,
		ungroup,
		canGroup,
		canUngroup,
		removeEntireGroup,
		isGroupSelected
	};
};
