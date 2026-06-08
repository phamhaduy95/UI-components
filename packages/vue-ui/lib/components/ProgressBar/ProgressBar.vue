<script setup lang="ts">
	import { Progress } from '@ark-ui/vue/progress';
	import type { ProgressBarEmits, ProgressBarProps } from './ProgressBar.type';

	import '@packages/styles/components/ProgressBar.css';

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<ProgressBarProps>(), {
		color: 'primary',
		size: 'md',
		min: 0,
		max: 100,
		orientation: 'horizontal',
		showValueText: true
	});

	const emit = defineEmits<ProgressBarEmits>();

	const handleValueChange = (details: { value: number | null }) => {
		emit('update:modelValue', details.value);
		emit('valueChange', details);
	};
</script>

<template>
	<Progress.Root
		class="ProgressBar"
		:class="[
			`ProgressBar--color-${color}`,
			`ProgressBar--size-${size}`,
			`ProgressBar--orientation-${orientation}`
		]"
		:default-value="props.defaultValue"
		:model-value="props.modelValue"
		:max="props.max"
		:min="props.min"
		:orientation="props.orientation"
		:translations="props.translations"
		v-bind="$attrs"
		@value-change="handleValueChange"
	>
		<div
			v-if="label || showValueText"
			class="ProgressBar_Header"
		>
			<Progress.Label
				v-if="label"
				class="ProgressBar_Label"
			>
				{{ label }}
			</Progress.Label>
			<Progress.ValueText
				v-if="showValueText"
				class="ProgressBar_ValueText"
			/>
		</div>
		<Progress.Track class="ProgressBar_Track">
			<Progress.Range class="ProgressBar_Range" />
		</Progress.Track>
	</Progress.Root>
</template>
