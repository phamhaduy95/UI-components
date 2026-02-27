<script setup lang="ts">
	import BaseButton, { type ButtonProps } from '@components/Button/BaseButton.vue';
	import '@packages/styles/components/IconButton.css';

	defineOptions({ inheritAttrs: false });

	export type IconButtonProps = ButtonProps;

	withDefaults(defineProps<IconButtonProps>(), {
		variant: 'contained',
		size: 'medium',
		color: 'primary',
		loading: false,
		type: 'button'
	});
</script>

<template>
	<BaseButton
		class="IconButton"
		:variant="variant"
		:size="size"
		:color="color"
		:loading="loading"
		:type="type"
		v-bind="$attrs"
	>
		<slot />
	</BaseButton>
</template>
