import { ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import type { CanvasConfig } from '@/modules/designer/types/Config.type';

const useCanvasConfigStore = defineStore('designer-canvas-config', () => {
	const canvasConfig = ref<CanvasConfig>({
		gridVisible: true,
		snapToGrid: true,
		gridVariant: 'dots',
		gridGap: 24,
		gridSize: 2,
		gridPatternColor: '#d1d5db'
	});

	const updateCanvasConfig = (config: Partial<CanvasConfig>) => {
		Object.assign(canvasConfig.value, config);
	};

	return {
		canvasConfig,
		updateCanvasConfig
	};
});

export const useCanvasConfig = () => {
	const store = useCanvasConfigStore();
	const { canvasConfig } = storeToRefs(store);

	const updateCanvasConfig = (config: Partial<CanvasConfig>) => {
		store.updateCanvasConfig(config);
	};

	return {
		canvasConfig,
		updateCanvasConfig
	};
};
