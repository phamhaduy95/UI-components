<script setup lang="ts">
	import { computed, useId, type ComponentInstance } from 'vue';
	import { DatePicker as ArkDatePicker, parseDate } from '@ark-ui/vue/date-picker';

	import { BaseCalendarView } from '@components/BaseCalendar';
	import { BaseField } from '@components/BaseField';
	import { IconButton } from '@components/IconButton';
	import { CalendarIcon, XMarkIcon } from '@heroicons/vue/20/solid';

	import type { DatePickerProps, DatePickerEmits, DatePickerSlots } from './DatePicker.type';

	import '@packages/styles/components/DatePicker.css';
	import dayjs from 'dayjs';

	type ArkDatePickerProps = ComponentInstance<typeof ArkDatePicker.Root>['$props'];

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<DatePickerProps>(), {
		format: 'DD-MM-YYYY',
		size: 'md',
		disabled: false,
		required: false,
		clearable: false,
		open: undefined,
		modelValue: undefined
	});

	const emit = defineEmits<DatePickerEmits>();

	defineSlots<DatePickerSlots>();

	const supportingTextId = useId();

	const internalModelValue = computed(() => {
		if (props.modelValue === null) {
			return [];
		}
		return props.modelValue ? [parseDate(props.modelValue)] : undefined;
	});

	const internalDefaultValue = computed(() => {
		return props.defaultValue ? [parseDate(props.defaultValue)] : undefined;
	});

	const handleDateChange: ArkDatePickerProps['onValueChange'] = (details) => {
		const { value } = details;
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const dateValue = value[0] ? value[0].toDate(timeZone) : null;

		emit('update:modelValue', dateValue);
		emit('valueChange', dateValue);
	};

	const format: ArkDatePickerProps['format'] = (date) => {
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
		:selection-mode="'single'"
		:disabled="disabled"
		:min="min"
		:max="max"
		:format="format"
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
			<ArkDatePicker.Control class="BaseField_Field DatePicker_Control">
				<ArkDatePicker.ValueText
					class="DatePicker_InputField"
					:placeholder="placeholder"
				/>

				<div class="BaseField_Trailing DatePicker_Trailing">
					<ArkDatePicker.ClearTrigger
						v-if="clearable"
						as-child
					>
						<IconButton
							:size="size"
							variant="text"
							color="secondary"
							aria-label="Clear value"
						>
							<XMarkIcon />
						</IconButton>
					</ArkDatePicker.ClearTrigger>

					<ArkDatePicker.Trigger as-child>
						<IconButton
							:size="size"
							variant="text"
							color="secondary"
							aria-label="Open calendar"
						>
							<CalendarIcon />
						</IconButton>
					</ArkDatePicker.Trigger>
				</div>

				<ArkDatePicker.Input
					tabindex="-1"
					style="user-select: none; display: none"
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
