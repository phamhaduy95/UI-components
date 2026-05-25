<script setup lang="ts">
	import type { FieldLabelProps, FieldLabelSlots } from './FieldLabel.type';

	import '@packages/styles/components/FieldLabel.css';

	defineOptions({ inheritAttrs: false });

	withDefaults(defineProps<FieldLabelProps>(), {
		type: 'label',
		required: false,
		showLabel: false
	});

	defineSlots<FieldLabelSlots>();
</script>

<template>
	<div v-if="showLabel">
		<template v-if="type === 'label'">
			<label
				class="FieldLabel"
				:data-status="status"
				v-bind="$attrs"
			>
				<slot />
			</label>
		</template>
		<template v-else>
			<component
				:is="type"
				class="FieldLabel"
				:data-status="status"
			>
				<slot />
			</component>
		</template>
		<span
			v-if="required"
			class="FieldLabel_Required"
		>
			*
		</span>
	</div>
</template>
