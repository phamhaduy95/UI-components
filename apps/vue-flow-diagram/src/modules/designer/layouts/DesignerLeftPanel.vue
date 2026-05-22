<script setup lang="ts">
import { nodeConfigMap } from '@/modules/designer/constant/nodeConfig';
</script>

<template>
	<aside
		class="z-10 flex w-64 shrink-0 flex-col border-r border-gray-200 bg-white shadow-[2px_0_5px_rgba(0,0,0,0.02)]"
	>
		<div class="border-b border-gray-100 px-4 py-3">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-800">Asset Library</h2>
		</div>
		<div class="flex-1 space-y-5 overflow-y-auto p-4">
			<!-- Basic Shapes -->
			<div class="space-y-2">
				<h3 class="text-xs font-medium uppercase text-gray-500">Basic Shapes</h3>
				<div class="grid grid-cols-4 gap-2">
					<component
						v-for="(config, key) in nodeConfigMap"
						:is="config.paletteComponent"
						:id="config.id"
						:key="config.id"
						:type="key"
						:label="config.label"
						:category="config.category"
					/>
				</div>
			</div>
		</div>
	</aside>
</template>
