<script setup lang="ts">
	import { computed, useId, type ComponentInstance } from 'vue';
	import { DatePicker as ArkDatePicker, parseDate } from '@ark-ui/vue/date-picker';

	import { BaseCalendarView } from '@components/BaseCalendar';
	import { BaseField } from '@components/BaseField';
	import { IconButton } from '@components/IconButton';
	import { CalendarIcon, XMarkIcon } from '@heroicons/vue/20/solid';

	import type {
		DateRangePickerProps,
		DateRangePickerEmits,
		DateRangePickerSlots
	} from './DateRangePicker.type';

	import '@packages/styles/components/DateRangePicker.css';
	import dayjs from 'dayjs';

	type ArkDatePickerProps = ComponentInstance<typeof ArkDatePicker.Root>['$props'];

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<DateRangePickerProps>(), {
		format: 'DD-MM-YYYY',
		disabled: false,
		required: false,
		clearable: false,
		modelValue: undefined,
		open: undefined
	});

	const emit = defineEmits<DateRangePickerEmits>();

	defineSlots<DateRangePickerSlots>();

	const supportingTextId = useId();

	const internalModelValue = computed(() => {
		return props.modelValue ? props.modelValue.map((d) => parseDate(d)) : undefined;
	});

	const internalDefaultValue = computed(() => {
		return props.defaultValue ? props.defaultValue.map((d) => parseDate(d)) : undefined;
	});

	const handleDateChange: ArkDatePickerProps['onValueChange'] = (details) => {
		const { value } = details;
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const dates = value.map((val) => val.toDate(timeZone));

		emit('update:modelValue', dates);
		emit('valueChange', dates);
	};

	const formatFunc: ArkDatePickerProps['format'] = (date) => {
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		return dayjs(date.toDate(timeZone)).format(props.format);
	};
</script>

<template>
	<ArkDatePicker.Root
		:id="id"
		class="DatePicker"
		:open="open"
		:model-value="internalModelValue"
		:default-value="internalDefaultValue"
		:selection-mode="'range'"
		:disabled="disabled"
		:min="min"
		:max="max"
		:format="formatFunc"
		:placeholder="placeholder"
		:read-only="readOnly"
		:required="required"
		:data-testid="dataTestid"
		as-child
		@value-change="handleDateChange"
		@update:open="emit('update:open', $event)"
	>
		<BaseField
			:label="label"
			:supporting-text="supportingText"
			:status="status"
			:disabled="disabled"
			:required="required"
			:size="size"
			:input-id="inputId"
			:supporting-text-id="supportingText ? supportingTextId : undefined"
			:label-element="ArkDatePicker.Label"
		>
			<ArkDatePicker.Control
				class="BaseField_Field DateRangePicker_Control"
				:aria-disabled="disabled"
				:aria-describedby="supportingText ? supportingTextId : undefined"
			>
				<div class="DateRangePicker_Input">
					<ArkDatePicker.Context v-slot="context">
						<p
							class="DateRangePicker_DisplayArea"
							aria-label="date range display"
						>
							<span :data-greyout="!Boolean(context.value[0])">{{
								context.valueAsString[0] || format
							}}</span>
							<span :data-greyout="!Boolean(context.value[0])">&mdash;</span>
							<span :data-greyout="!Boolean(context.value[1])">{{
								context.valueAsString[1] || format
							}}</span>
						</p>
					</ArkDatePicker.Context>
				</div>
				<div class="BaseField_Trailing">
					<ArkDatePicker.ClearTrigger
						v-if="clearable"
						as-child
					>
						<IconButton
							variant="text"
							:size="size"
							color="secondary"
							aria-label="Clear value"
						>
							<slot name="clearIcon">
								<XMarkIcon />
							</slot>
						</IconButton>
					</ArkDatePicker.ClearTrigger>

					<ArkDatePicker.Trigger as-child>
						<IconButton
							variant="text"
							:size="size"
							color="secondary"
							aria-label="Open calendar"
						>
							<slot name="triggerIcon">
								<CalendarIcon />
							</slot>
						</IconButton>
					</ArkDatePicker.Trigger>
				</div>

				<ArkDatePicker.Input
					tabindex="-1"
					style="display: none; user-select: none; pointer-events: none"
					hidden
					:aria-describedby="supportingTextId"
				/>
			</ArkDatePicker.Control>
			<Teleport to="body">
				<ArkDatePicker.Positioner
					class="Menu_Positioner"
					style="z-index: var(--menu-popup-z-index)"
				>
					<ArkDatePicker.Content>
						<BaseCalendarView />
					</ArkDatePicker.Content>
				</ArkDatePicker.Positioner>
			</Teleport>
		</BaseField>
	</ArkDatePicker.Root>
</template>
