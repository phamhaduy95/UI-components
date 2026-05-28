<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
	import { Switch as ArkSwitch } from '@ark-ui/vue/switch';
	import type { SwitchEmits, SwitchProps } from './Switch.type';

	import '@packages/styles/components/Switch.css';

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<SwitchProps>(), {
		color: 'primary',
		defaultChecked: false,
		size: 'md',
		checked: undefined
	});

	const emit = defineEmits<SwitchEmits>();

	const handleCheckedChange = (checked: boolean) => {
		emit('update:checked', checked);
		emit('checkedChange', { checked, value: props.value });
	};
</script>

<template>
	<ArkSwitch.Root
		class="Switch"
		:name="name"
		:value="value"
		:disabled="disabled"
		:checked="checked"
		:default-checked="defaultChecked"
		:data-color="color"
		:data-size="size"
		:data-testid="dataTestid"
		@update:checked="handleCheckedChange"
	>
		<ArkSwitch.Control class="Switch_Control">
			<ArkSwitch.Thumb class="Switch_Thumb" />
		</ArkSwitch.Control>
		<ArkSwitch.Label class="Switch_Label">
			{{ label }}
		</ArkSwitch.Label>
		<ArkSwitch.HiddenInput v-bind="$attrs" />
	</ArkSwitch.Root>
</template>
