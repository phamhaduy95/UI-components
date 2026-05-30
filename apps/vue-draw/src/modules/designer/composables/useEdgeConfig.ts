import { ref, toRaw } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import type { DesignerEdge, EdgeData } from '@/modules/designer/types/Edge.type';

import { useNodeCommandFactory } from './useCommandFactory';
import { useHistory } from './useHistory';
import type { ConfigurableEdgeProps } from '@/modules/designer/types/Command.type';

const useEdgeConfigStore = defineStore('designer-edge-config', () => {
	const selectedEdge = ref<DesignerEdge | null>(null);

	return {
		selectedEdge
	};
});

export const useEdgeConfig = () => {
	const store = useEdgeConfigStore();
	const { selectedEdge } = storeToRefs(store);

	const { createUpdateEdgeCommand, createUpdateEdgeDataCommand } = useNodeCommandFactory();
	const { commit } = useHistory();

	const setSelectedEdge = (edge: DesignerEdge) => {
		selectedEdge.value = edge;
	};

	const updateEdgeBasicProps = (basicProps: ConfigurableEdgeProps) => {
		const edge = selectedEdge.value;
		if (!edge) return;

		const fieldsToKeep: Array<keyof ConfigurableEdgeProps> = ['type', 'label'];

		const beforeData = fieldsToKeep.reduce((acc, key) => {
			if (key in basicProps)
				Object.assign(acc, {
					[key]: edge[key]
				});
			return acc;
		}, {} as ConfigurableEdgeProps);

		const afterData = {
			...beforeData,
			...basicProps
		};

		const command = createUpdateEdgeCommand([{ edgeId: edge.id, beforeData, afterData }]);
		commit(command);
	};

	const updateEdgeData = (config: Partial<EdgeData>) => {
		const edge = selectedEdge.value;
		if (!edge) return;

		const beforeData = structuredClone(toRaw(edge.data)) as EdgeData;
		const afterData = structuredClone(toRaw({ ...beforeData, ...config }));

		const command = createUpdateEdgeDataCommand([{ edgeId: edge.id, beforeData, afterData }]);

		commit(command);
	};

	return {
		setSelectedEdge,
		selectedEdge,
		updateEdgeBasicProps,
		updateEdgeData
	};
};
