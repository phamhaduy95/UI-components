<script setup lang="ts">
	import { DataTable } from '@components/DataTable';
	import type { DataTableEmit, DataTableProps, DataTableSlots } from '@components/DataTable';

	export type Person = {
		id: string;
		firstName: string;
		lastName: string;
		age: number;
		visits: number;
		status: string;
		progress: number;
	};

	type Props = DataTableProps<Person>;

	const props = defineProps<Props>();

	type Emit = DataTableEmit<Person>;

	const emit = defineEmits<Emit>();

	type Slot = DataTableSlots<Person>;

	defineSlots<Slot>();
</script>

<template>
	<DataTable
		v-bind="props"
		@update:selected-value="emit('update:selectedValue', $event)"
		@update:visible-headers="emit('update:visibleHeaders', $event)"
		@update:pagination="emit('update:pagination', $event)"
	>
		<template
			v-for="(_, slotName) in $slots"
			#[slotName]="slotProps"
		>
			<slot
				:name="slotName as keyof Slot"
				v-bind="slotProps"
			/>
		</template>
	</DataTable>
</template>
