<script setup lang="ts">
	import { Combobox as ArkCombobox } from '@ark-ui/vue/combobox';
	import { BaseCombobox } from '@components/BaseCombobox';
	import { Chip } from '@components/Chip';
	import type { SelectItem } from '@components/type';

	import type {
		MultipleComboboxEmits,
		MultipleComboboxProps,
		MultipleComboboxSlots
	} from './MultipleCombobox.type';

	import '@packages/styles/components/MultipleCombobox.css';

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<MultipleComboboxProps>(), {
		modelValue: undefined,
		placeholder: undefined,
		items: () => [],
		open: undefined
	});

	const emit = defineEmits<MultipleComboboxEmits>();

	defineSlots<MultipleComboboxSlots>();

	const handleKeydown = (
		e: KeyboardEvent,
		selectedItems: SelectItem[],
		clearValue: (val: string) => void
	) => {
		const { key } = e;
		const target = e.target as HTMLInputElement;

		if (!target.value && key === 'Backspace' && selectedItems.length > 0) {
			const lastSelectedItem = selectedItems[selectedItems.length - 1];
			if (!lastSelectedItem) return;
			clearValue(lastSelectedItem.value);
		}
	};
</script>

<template>
	<BaseCombobox
		class="MultipleCombobox"
		v-bind="props"
		multiple
		@value-change="emit('valueChange', $event)"
		@update:model-value="emit('update:modelValue', $event)"
		@update:open="emit('update:open', $event)"
		@update:input-value="emit('update:inputValue', $event)"
	>
		<template #customValueText="{ supportingTextId }">
			<ArkCombobox.Context v-slot="combobox">
				<div class="MultipleCombobox_DisplayArea">
					<Chip
						v-for="item in combobox.selectedItems"
						:key="item.value"
						:label="item.label"
						removable
						@remove="
							() => {
								combobox.clearValue(item.value);
								combobox.focus();
							}
						"
					/>
					<ArkCombobox.Input
						class="MultipleCombobox_Input"
						:disabled="disabled"
						:placeholder="
							placeholder && combobox.selectedItems.length === 0 ? placeholder : undefined
						"
						:aria-describedby="supportingTextId"
						v-bind="$attrs"
						@keydown="handleKeydown($event, combobox.selectedItems, combobox.clearValue)"
					/>
				</div>
			</ArkCombobox.Context>
		</template>

		<template
			v-for="(_, name) in $slots"
			#[name]="slotProps"
		>
			<slot
				v-if="name !== 'customValueText'"
				:name="name"
				v-bind="slotProps || {}"
			></slot>
		</template>
	</BaseCombobox>
</template>
