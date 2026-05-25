<script setup lang="ts">
	import { ref, computed, type ComponentInstance } from 'vue';
	import { Toggle as ArkToggle } from '@ark-ui/vue/toggle';
	import { Button } from '@components/Button';

	import type {
		ToggleButtonEmits,
		ToggleButtonProps,
		ToggleButtonSlots
	} from './ToggleButton.type';

	defineOptions({ inheritAttrs: false });

	type ArkToggleRootProps = ComponentInstance<typeof ArkToggle.Root>;

	const props = withDefaults(defineProps<ToggleButtonProps>(), {
		size: 'md',
		defaultPressed: false,
		pressed: undefined
	});

	const emit = defineEmits<ToggleButtonEmits>();

	defineSlots<ToggleButtonSlots>();

	const internalPressed = ref(props.defaultPressed);

	const isPressed = computed(() => props.pressed ?? internalPressed.value);

	const handlePressedChange: ArkToggleRootProps['onPressedChange'] = (pressed) => {
		internalPressed.value = pressed;
		emit('update:pressed', pressed);
		emit('pressedChange', pressed);
	};
</script>

<template>
	<ArkToggle.Root
		:pressed="isPressed"
		:default-pressed="defaultPressed"
		:disabled="disabled"
		as-child
		@update:pressed="handlePressedChange"
	>
		<Button
			class="ToggleButton"
			:color="color"
			:size="size"
			:loading="loading"
			:disabled="disabled"
			:type="type"
			:variant="isPressed ? 'contained' : 'outlined'"
			v-bind="$attrs"
		>
			<ArkToggle.Context v-slot="context">
				<slot v-bind="context" />
			</ArkToggle.Context>
		</Button>
	</ArkToggle.Root>
</template>
