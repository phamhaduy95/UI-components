<script setup lang="ts">
	import '@packages/styles/components/Button.css';
	import type { ButtonProps, ButtonSlots } from './Button.type';

	withDefaults(defineProps<ButtonProps>(), {
		variant: 'contained',
		size: 'medium',
		color: 'primary',
		loading: false,
		type: 'button'
	});

	defineSlots<ButtonSlots>();
</script>

<template>
	<button
		class="Button"
		:data-variant="variant"
		:data-size="size"
		:data-color="color"
		:type="type"
		v-bind="$attrs"
	>
		<slot />
	</button>
</template>
