<script setup lang="ts">
	import { useSelectContext } from '@ark-ui/vue/select';
	import { Chip } from '@components/Chip';

	defineProps<{
		placeholder?: string;
	}>();

	const selectContext = useSelectContext();

	const handleRemove = (itemValue: string) => {
		selectContext.value.clearValue(itemValue);
	};
</script>

<template>
	<span
		v-if="!selectContext.selectedItems.length"
		class="Select_DisplayedValue"
	>
		{{ placeholder }}
	</span>
	<div
		v-else
		class="Select_DisplayedValue"
	>
		<Chip
			v-for="item in selectContext.selectedItems"
			:key="item.value"
			:label="item.label"
			removable
			@remove="handleRemove(item.value)"
		/>
	</div>
</template>
