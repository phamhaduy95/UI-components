import { ref, toRaw } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useNodeCommandFactory } from './useCommandFactory';
import { useHistory } from './useHistory';
import type { ConfigurableNodeProps } from '@/modules/designer/types/Command.type';
import type {
	DesignGraphNode,
	BasicShapeNodeData,
	BaseNodeData
} from '@/modules/designer/types/Node.type';

type BasicShapNode = DesignGraphNode<BasicShapeNodeData>;

const useNodeConfigStore = defineStore('designer-node-config', () => {
	const selectedNode = ref<BasicShapNode | null>(null);

	return {
		selectedNode
	};
});

export const useNodeConfig = () => {
	const store = useNodeConfigStore();

	const { selectedNode } = storeToRefs(store);

	const { createUpdateNodesCommand, createUpdateNodeDataCommand } = useNodeCommandFactory();
	const { commit } = useHistory();

	const setSelectedNode = (node: BasicShapNode | null) => {
		selectedNode.value = node;
	};

	const updateNodeBasicProps = (basicProps: ConfigurableNodeProps) => {
		const node = selectedNode.value;
		if (!node) return;

		const fieldsToKeep: Array<keyof ConfigurableNodeProps> = [
			'style',
			'dimensions',
			'position',
			'zIndex',
			'hidden'
		] as const;

		const beforeData = fieldsToKeep.reduce((acc, key) => {
			if (key in basicProps) {
				Object.assign(acc, {
					[key]: node[key]
				});
			}
			return acc;
		}, {} as ConfigurableNodeProps);

		const afterData = {
			...beforeData,
			...basicProps
		};

		const command = createUpdateNodesCommand([
			{ nodeId: node.id, before: beforeData, after: afterData }
		]);
		commit(command);
	};

	const updateNodeData = <T extends BaseNodeData = BaseNodeData>(config: Partial<T>) => {
		const node = selectedNode.value;
		if (!node || !node.data) return;

		const beforeData = structuredClone(toRaw(node.data));
		const afterData = structuredClone(toRaw({ ...beforeData, ...config }));

		const command = createUpdateNodeDataCommand([{ nodeId: node.id, beforeData, afterData }]);

		commit(command);
	};

	return {
		setSelectedNode,
		selectedNode,
		updateNodeBasicProps,
		updateNodeData
	};
};
