<script setup lang="ts">
	import { computed } from 'vue';
	import { getSmoothStepPath, type ConnectionLineProps } from '@vue-flow/core';

	const props = defineProps<ConnectionLineProps>();

	const path = computed(() => {
		const [d] = getSmoothStepPath({
			sourceX: props.sourceX,
			sourceY: props.sourceY,
			sourcePosition: props.sourcePosition,
			targetX: props.targetX,
			targetY: props.targetY,
			targetPosition: props.targetPosition
		});
		return d;
	});
</script>

<template>
	<g>
		<path
			fill="none"
			stroke="#b1b1b7"
			:stroke-width="2"
			class="animated"
			:d="path"
			marker-end="url(#marker-arrow-end)"
		/>
	</g>
</template>

<style scoped>
	.animated {
		stroke-dasharray: 5;
		animation: dashdraw 0.5s linear infinite;
	}

	@keyframes dashdraw {
		from {
			stroke-dashoffset: 10;
		}
	}
</style>
