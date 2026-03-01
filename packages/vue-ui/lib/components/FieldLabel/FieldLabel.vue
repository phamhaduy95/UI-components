<script setup lang="ts">
	import type { LabelHTMLAttributes, Component } from 'vue';
	import type { FieldStatus } from '@components/type';
	import '@packages/styles/components/FieldLabel.css';

	defineOptions({ inheritAttrs: false });

	export interface FieldLabelProps extends /* @vue-ignore */ LabelHTMLAttributes {
		type?: string | Component;
		status?: FieldStatus;
		required?: boolean;
		showLabel?: boolean;
	}

	withDefaults(defineProps<FieldLabelProps>(), {
		type: 'label',
		required: false,
		showLabel: false
	});
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
