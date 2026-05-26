import { computed } from 'vue';
import { useVueFlow } from '@vue-flow/core';

export const useZoom = () => {
	const { zoomIn, zoomOut, zoomTo, fitView, viewport, minZoom, maxZoom } = useVueFlow();

	const currentZoom = computed(() => viewport.value.zoom);
	const zoomPercentage = computed(() => Math.round(currentZoom.value * 100));

	const canZoomIn = computed(() => currentZoom.value < maxZoom.value);
	const canZoomOut = computed(() => currentZoom.value > minZoom.value);

	const handleZoomIn = (options?: { duration?: number }) => {
		zoomIn(options);
	};

	const handleZoomOut = (options?: { duration?: number }) => {
		zoomOut(options);
	};

	const handleZoomTo = (zoomLevel: number) => {
		zoomTo(zoomLevel, { duration: 0 });
	};

	const handleFitView = () => {
		fitView({ duration: 0 });
	};

	const resetZoom = () => {
		zoomTo(1, { duration: 0 });
	};

	return {
		currentZoom,
		zoomPercentage,
		canZoomIn,
		canZoomOut,
		zoomIn: handleZoomIn,
		zoomOut: handleZoomOut,
		zoomTo: handleZoomTo,
		fitView: handleFitView,
		resetZoom
	};
};
