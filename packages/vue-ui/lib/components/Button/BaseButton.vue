<script setup lang="ts">
	import type { ButtonHTMLAttributes } from 'vue';
	import '@packages/styles/components/Button.css';

	type ButtonVariant = 'contained' | 'outlined' | 'text';
	type ButtonSize = 'small' | 'medium' | 'large';
	type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

	export interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
		variant?: ButtonVariant;
		size?: ButtonSize;
		color?: ButtonColor;
		loading?: boolean;
		type?: 'button' | 'submit' | 'reset';
	}

	withDefaults(defineProps<ButtonProps>(), {
		variant: 'contained',
		size: 'medium',
		color: 'primary',
		loading: false,
		type: 'button'
	});
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
