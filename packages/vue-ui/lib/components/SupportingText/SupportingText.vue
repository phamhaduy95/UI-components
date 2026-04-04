<script setup lang="ts">
	import type { SupportingTextProps, SupportingTextSlots } from './SupportingText.type';
	import '@packages/styles/components/SupportingText.css';

	withDefaults(defineProps<SupportingTextProps>(), {
		show: true
	});

	defineSlots<SupportingTextSlots>();
</script>

<template>
	<p
		v-if="show"
		class="SupportingText"
		:data-status="status"
	>
		<slot />
	</p>
</template>
