<script setup lang="ts">
	import type { HTMLAttributes } from 'vue';
	import { XMarkIcon } from '@heroicons/vue/20/solid';

	import '@packages/styles/components/Chip.css';

	export type ChipSize = 'small' | 'medium';
	export type ChipColor = 'primary' | 'secondary' | 'error' | 'success' | 'warning';
	export type ChipVariant = 'filled' | 'outlined';

	export interface ChipProps extends /* @vue-ignore */ HTMLAttributes {
		label?: string;
		removable?: boolean;
		size?: ChipSize;
		color?: ChipColor;
		disabled?: boolean;
		variant?: ChipVariant;
		clickable?: boolean;
		dataTestid?: string;
	}

	export interface ChipEmits {
		click: [event: MouseEvent];
		remove: [];
	}

	const props = withDefaults(defineProps<ChipProps>(), {
		size: 'medium',
		color: 'primary',
		removable: false,
		disabled: false,
		clickable: false
	});

	const emit = defineEmits<ChipEmits>();

	const handleRemove = () => {
		emit('remove');
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (!props.removable) return;
		e.stopPropagation();
		const key = e.key;
		if (key === 'Backspace' || key === 'Delete') {
			handleRemove();
		}
	};
</script>

<template>
	<div
		class="Chip"
		:data-removable="removable"
		:data-size="size"
		:data-color="color"
		:aria-label="label"
		:data-disabled="disabled"
		:data-clickable="clickable"
		:role="clickable ? 'button' : undefined"
		:tabindex="clickable ? 0 : undefined"
		:data-testid="dataTestid"
		@click="clickable ? emit('click', $event) : undefined"
	>
		<span class="Chip_Label">{{ label }}</span>
		<span
			v-if="removable"
			class="Chip_RemoveButton"
			aria-label="Remove Chip"
			:role="!clickable ? 'button' : undefined"
			:tabindex="!clickable ? 0 : undefined"
			@click.stop="handleRemove"
			@keydown.stop="handleKeyDown"
		>
			<XMarkIcon class="Chip_RemoveIcon" />
		</span>
	</div>
</template>
