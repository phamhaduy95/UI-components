<script setup lang="ts">
	import type { LabelHTMLAttributes } from 'vue';
	import type { FieldStatus } from '@components/type';
	import '@packages/styles/components/FieldLabel.css';

	defineOptions({ inheritAttrs: false });

	export interface FieldLabelProps extends /* @vue-ignore */ LabelHTMLAttributes {
		type?: string;
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
		<component
			:is="type"
			class="FieldLabel"
			:data-status="status"
			v-bind="$attrs"
		>
			<slot />
		</component>
		<span
			v-if="required"
			class="FieldLabel_Required"
		>
			*
		</span>
	</div>
</template>
