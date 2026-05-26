<script setup lang="ts">
	import { Handle, Position } from '@vue-flow/core';

	export interface GenericNodeConnectorProps {
		isVisible?: boolean;
	}

	withDefaults(defineProps<GenericNodeConnectorProps>(), {
		isVisible: false
	});
</script>

<template>
	<div class="absolute inset-0 pointer-events-none">
		<!-- Top -->
		<Handle
			id="top-source"
			type="source"
			:position="Position.Top"
			class="bg-white w-2.5 h-2.5 border-2 border-blue-500 pointer-events-auto transition-colors hover:bg-blue-100"
		/>
		<Handle
			id="top-target"
			type="target"
			:position="Position.Top"
			class="bg-white w-2.5 h-2.5 border-2 border-blue-500 pointer-events-auto transition-colors hover:bg-blue-100! opacity-0"
		/>

		<!-- Right -->
		<Handle
			id="right-source"
			type="source"
			:position="Position.Right"
			class="bg-white w-2.5 h-2.5 border-2 border-blue-500 pointer-events-auto transition-colors hover:bg-blue-100!"
		/>
		<Handle
			id="right-target"
			type="target"
			:position="Position.Right"
			class="bg-white w-2.5 h-2.5 border-2 border-blue-500 pointer-events-auto transition-colors hover:bg-blue-100! opacity-0"
		/>

		<!-- Bottom -->
		<Handle
			id="bottom-source"
			type="source"
			:position="Position.Bottom"
			class="bg-white w-2.5 h-2.5 border-2 border-blue-500 pointer-events-auto transition-colors hover:bg-blue-100"
		/>
		<Handle
			id="bottom-target"
			type="target"
			:position="Position.Bottom"
			class="bg-white w-2.5 h-2.5 border-2 border-blue-500 pointer-events-auto transition-colors hover:bg-blue-100 opacity-0"
		/>

		<!-- Left -->
		<Handle
			id="left-source"
			type="source"
			:position="Position.Left"
			class="bg-white w-2.5 h-2.5 border-2 border-blue-500 pointer-events-auto transition-colors hover:bg-blue-100"
		/>
		<Handle
			id="left-target"
			type="target"
			:position="Position.Left"
			class="bg-white w-2.5 h-2.5 border-2 border-blue-500 pointer-events-auto transition-colors hover:bg-blue-100 opacity-0"
		/>
	</div>
</template>
