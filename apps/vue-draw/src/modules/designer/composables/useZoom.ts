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

	const handleZoomTo = (zoomLevel: number, options?: { duration?: number }) => {
		zoomTo(zoomLevel, options);
	};

	const handleFitView = (options?: { duration?: number; padding?: number }) => {
		fitView(options);
	};

	const resetZoom = (options?: { duration?: number }) => {
		zoomTo(1, options);
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
