<script setup lang="ts">
	import { ref, computed, type ComponentInstance } from 'vue';
	import { Toggle as ArkToggle, type ToggleRootEmits } from '@ark-ui/vue/toggle';
	import { Button, type ButtonProps } from '@components/Button';

	defineOptions({ inheritAttrs: false });

	export interface ToggleButtonProps extends Omit<ButtonProps, 'variant'> {
		pressed?: boolean;
		defaultPressed?: boolean;
		disabled?: boolean;
	}

	type ArkToggleRootProps = ComponentInstance<typeof ArkToggle.Root>;

	export type ToogleButtonEmits = ToggleRootEmits;

	const props = withDefaults(defineProps<ToggleButtonProps>(), {
		size: 'medium',
		defaultPressed: false,
		pressed: undefined
	});

	const emit = defineEmits<ToogleButtonEmits>();

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
