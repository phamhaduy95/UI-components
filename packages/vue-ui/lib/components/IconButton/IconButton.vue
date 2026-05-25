<script setup lang="ts">
	import { Button as BaseButton } from '@components/Button';
	import type { IconButtonProps, IconButtonSlots } from './IconButton.type';

	import '@packages/styles/components/IconButton.css';

	defineOptions({ inheritAttrs: false });

	withDefaults(defineProps<IconButtonProps>(), {
		variant: 'contained',
		size: 'md',
		color: 'primary',
		shape: 'circle',
		loading: false,
		type: 'button'
	});

	defineSlots<IconButtonSlots>();
</script>

<template>
	<BaseButton
		class="IconButton"
		:data-shape="shape"
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
