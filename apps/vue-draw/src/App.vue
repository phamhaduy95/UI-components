<script setup lang="ts">
	import MainLayout from './layouts/MainLayout.vue';
	import { RouterView as NavView } from 'vue-router';
</script>

<template>
	<MainLayout>
		<NavView />
	</MainLayout>
</template>

<style>
	html,
	body,
	#app {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Helvetica,
			Arial,
			sans-serif;
		background-color: var(--color-bg-canvas); /* Assuming the design system provides variables */
	}
</style>
