<script setup lang="ts">
	import { computed } from 'vue';
	import { XMarkIcon } from '@heroicons/vue/20/solid';

	import type { ChipProps, ChipEmits, ChipSlots } from './Chip.type';

	import '@packages/styles/components/Chip.css';

	const props = withDefaults(defineProps<ChipProps>(), {
		color: 'primary',
		size: 'md',
		removable: false,
		disabled: false,
		clickable: false
	});

	const emit = defineEmits<ChipEmits>();

	defineSlots<ChipSlots>();

	const handleRemove = () => {
		emit('remove');
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (!props.removable) return;
		const key = e.key;
		if (['Backspace', 'Delete'].includes(key)) {
			handleRemove();
		}
	};

	const isInteractive = computed(() => props.clickable || props.removable);
</script>

<template>
	<div
		class="Chip"
		:data-size="size"
		:data-color="color"
		:aria-label="label"
		:data-disabled="disabled"
		:data-clickable="isInteractive"
		:data-removable="removable"
		:role="isInteractive ? 'button' : undefined"
		:tabindex="isInteractive ? 0 : undefined"
		:data-testid="dataTestid"
		@click.stop="emit('click', $event)"
		@keydown.stop="handleKeyDown"
	>
		<span class="Chip_Label">{{ label }}</span>
		<span
			v-if="removable"
			class="Chip_RemoveButton"
			data-part="chip_remove-icon"
			@click.stop="handleRemove"
		>
			<slot name="removeIcon">
				<XMarkIcon class="Chip_RemoveIcon" />
			</slot>
		</span>
	</div>
</template>
