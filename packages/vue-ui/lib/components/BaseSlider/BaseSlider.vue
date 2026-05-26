<script setup lang="ts">
	import { Slider as ArkSlider } from '@ark-ui/vue/slider';
	import { BaseField } from '@components/BaseField';
	import { computed, useId } from 'vue';
	import type { BaseSliderEmits, BaseSliderProps, BaseSliderSlots } from './BaseSlider.type';

	import '@packages/styles/components/BaseSlider.css';
	import '@packages/styles/components/FieldLabel.css';

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<BaseSliderProps>(), {
		color: 'primary',
		size: 'md',
		min: 0,
		max: 100,
		step: 1,
		thumbAlignment: 'contain',
		thumbCollisionBehavior: 'none',
		modelValue: undefined,
		defaultValue: undefined,
		showValue: true,
		hasHiddenInput: true
	});

	const emit = defineEmits<BaseSliderEmits>();

	defineSlots<BaseSliderSlots>();

	const supportingTextId = useId();

	const handleValueChange = (details: { value: number[] }) => {
		emit('update:modelValue', details.value);
		emit('valueChange', details);
	};

	const handleValueChangeEnd = (details: { value: number[] }) => {
		emit('valueChangeEnd', details);
	};

	const computedMarks = computed(() => {
		if (!props.marks) return [];
		return props.marks.map((mark) => {
			if (typeof mark === 'number') {
				return { value: mark, label: mark.toString() };
			}
			return mark;
		});
	});

	const thumbs = computed(() => {
		const values = props.modelValue ?? props.defaultValue;
		return values ? values : [0];
	});
</script>

<template>
	<ArkSlider.Root
		class="Slider"
		:name="name"
		:model-value="modelValue"
		:default-value="defaultValue"
		:min="min"
		:max="max"
		:step="step"
		:disabled="disabled"
		:origin="origin"
		:thumb-alignment="thumbAlignment"
		:thumb-collision-behavior="thumbCollisionBehavior"
		:min-steps-between-thumbs="minStepsBetweenThumbs"
		:data-color="color"
		:data-size="size"
		:data-testid="dataTestid"
		@value-change="handleValueChange"
		@value-change-end="handleValueChangeEnd"
	>
		<ArkSlider.Context v-slot="slider">
			<BaseField
				:label="label"
				:supporting-text="supportingText"
				:size="size"
				:disabled="disabled"
				:required="required"
				:supporting-text-id="supportingTextId"
			>
				<template #label>
					<slot
						name="label"
						:label="label"
						:required="required"
						:value="slider.value"
					>
						<div class="Slider_LabelGroup">
							<ArkSlider.Label
								v-if="label"
								class="FieldLabel Slider_Label"
							>
								{{ label }}
								<span
									v-if="required"
									class="FieldLabel_Required"
									role="presentation"
								>
									*
								</span>
							</ArkSlider.Label>

							<slot
								name="valueText"
								:value="slider.value"
							>
								<ArkSlider.ValueText
									v-if="showValue"
									class="Slider_ValueText"
									data-testid="slider-value-text"
								/>
							</slot>
						</div>
					</slot>
				</template>

				<div class="Slider_ControlWrapper">
					<ArkSlider.Control class="Slider_Control">
						<ArkSlider.Track class="Slider_Track">
							<ArkSlider.Range class="Slider_Range" />
						</ArkSlider.Track>
						<ArkSlider.Thumb
							v-for="(_, index) in thumbs"
							:key="index"
							:index="index"
							class="Slider_Thumb"
							:aria-describedby="supportingText ? supportingTextId : undefined"
						>
							<ArkSlider.HiddenInput
								v-if="hasHiddenInput"
								v-bind="$attrs"
								:aria-describedby="supportingText ? supportingTextId : undefined"
							/>
						</ArkSlider.Thumb>
					</ArkSlider.Control>
					<slot
						name="trailing"
						:label="label"
						:value="slider.value"
						:set-value="slider.setValue"
					/>
				</div>
				<ArkSlider.MarkerGroup
					v-if="computedMarks.length > 0"
					class="Slider_MarkerGroup"
					data-testid="slider-marker-group"
				>
					<ArkSlider.Marker
						v-for="mark in computedMarks"
						:key="mark.value"
						:value="mark.value"
						class="Slider_Marker"
					>
						{{ mark.label }}
					</ArkSlider.Marker>
				</ArkSlider.MarkerGroup>
			</BaseField>
		</ArkSlider.Context>
	</ArkSlider.Root>
</template>
