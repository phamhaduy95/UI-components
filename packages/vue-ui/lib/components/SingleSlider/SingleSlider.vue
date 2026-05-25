<script setup lang="ts">
	import { NumberInput as ArkNumberInput } from '@ark-ui/vue/number-input';
	import { BaseSlider } from '@components/BaseSlider';

	import { computed } from 'vue';
	import type {
		SingleSliderEmits,
		SingleSliderProps,
		SingleSliderSlots
	} from './SingleSlider.type';

	import '@packages/styles/components/SingleSlider.css';

	const props = withDefaults(defineProps<SingleSliderProps>(), {
		color: 'primary',
		size: 'md',
		min: 0,
		max: 100,
		step: 1,
		thumbAlignment: 'contain',
		thumbCollisionBehavior: 'none'
	});

	const emit = defineEmits<SingleSliderEmits>();

	defineSlots<SingleSliderSlots>();

	const sliderModelValue = computed(() =>
		props.modelValue !== undefined ? [props.modelValue] : undefined
	);
	const sliderDefaultValue = computed(() =>
		props.defaultValue !== undefined ? [props.defaultValue] : undefined
	);

	const maxCharCount = computed(() => {
		const minStr = String(props.min);
		const maxStr = String(props.max);
		const stepStr = String(props.step);

		const getIntLen = (s: string) => s.split('.')[0]?.length || 0;
		const getDecLen = (s: string) => s.split('.')[1]?.length || 0;

		const maxIntChars = Math.max(getIntLen(minStr), getIntLen(maxStr));
		const maxDecChars = Math.max(getDecLen(minStr), getDecLen(maxStr), getDecLen(stepStr));

		const totalChars = maxIntChars + (maxDecChars > 0 ? 1 + maxDecChars : 0);
		return `${totalChars}ch`;
	});

	const handleValueChange = (details: { value: number[] }) => {
		const val = details.value[0];
		if (val === undefined) return;
		emit('update:modelValue', val);
		emit('valueChange', val);
	};

	const handleValueChangeEnd = (details: { value: number[] }) => {
		const val = details.value[0];
		if (val === undefined) return;
		emit('valueChangeEnd', val);
	};
</script>

<template>
	<BaseSlider
		v-bind="props"
		:model-value="sliderModelValue"
		:default-value="sliderDefaultValue"
		class="SingleSlider"
		:show-value="!editable"
		:has-hidden-input="!editable"
		@value-change="handleValueChange"
		@value-change-end="handleValueChangeEnd"
	>
		<template
			v-if="editable"
			#trailing="{ value, setValue }"
		>
			<ArkNumberInput.Root
				class="SingleSlider_NumberInput"
				:style="{
					'--slider-input-char-count': maxCharCount
				}"
				:model-value="value.toString()"
				:min="min"
				:max="max"
				:step="step"
				:disabled="disabled"
				@value-change="(e) => setValue([e.valueAsNumber])"
			>
				<ArkNumberInput.Control class="SingleSlider_NumberInput_Control">
					<ArkNumberInput.Input
						:style="{
							width: props.numberInputWidth || undefined
						}"
						class="SingleSlider_NumberInput_Input"
						:aria-label="numberInputLabel"
					/>
				</ArkNumberInput.Control>
			</ArkNumberInput.Root>
		</template>
		<template
			v-for="(_, slotName) in $slots"
			#[slotName]="slotData"
		>
			<slot
				:name="slotName as keyof Exclude<SingleSliderSlots, 'trailing'>"
				v-bind="slotData"
			/>
		</template>
	</BaseSlider>
</template>
