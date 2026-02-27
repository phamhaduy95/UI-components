<script setup lang="ts">
	import type { HTMLAttributes } from 'vue';
	import type { FieldStatus } from '@components/type';
	import '@packages/styles/components/SupportingText.css';

	defineOptions({ inheritAttrs: false });

	export interface SupportingTextProps extends /* @vue-ignore */ HTMLAttributes {
		status?: FieldStatus;
		show?: boolean;
	}

	withDefaults(defineProps<SupportingTextProps>(), {
		show: true
	});
</script>

<template>
	<p
		v-if="show"
		class="SupportingText"
		:data-status="status"
		v-bind="$attrs"
	>
		<slot />
	</p>
</template>
