<script setup lang="ts">
	import type { HTMLAttributes } from 'vue';
	import { Switch as ArkSwitch } from '@ark-ui/vue/switch';
	import type { CommonFieldProps } from '@components/type';

	import '@packages/styles/components/Switch.css';

	defineOptions({ inheritAttrs: false });

	export interface SwitchProps
		extends Pick<
				CommonFieldProps<boolean>,
				'size' | 'supportingText' | 'disabled' | 'name' | 'label'
			>,
			/* @vue-ignore */ HTMLAttributes {
		value?: string;
		color?: 'primary' | 'success' | 'error' | 'warning' | 'secondary';
		checked?: boolean;
		defaultChecked?: boolean;
		dataTestid?: string;
	}

	export interface SwitchEmits {
		'update:checked': [value: boolean];
		checkedChange: [payload: { checked: boolean; value?: string }];
	}

	const props = withDefaults(defineProps<SwitchProps>(), {
		color: 'primary',
		size: 'medium',
		defaultChecked: false,
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
