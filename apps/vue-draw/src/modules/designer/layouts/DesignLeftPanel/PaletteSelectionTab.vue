<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { TextInput } from '@packages/vue-components';
	import { nodeConfigMap } from '@/modules/designer/constant/nodeConfig';
	import { NodeCategory } from '@/modules/designer/types/Node.type';

	const searchQuery = ref('');

	const groupedNodes = computed(() => {
		const groups: Record<string, typeof nodeConfigMap> = {};
		const query = searchQuery.value.toLowerCase().trim();

		for (const [key, config] of Object.entries(nodeConfigMap)) {
			if (config.category === NodeCategory.Group) continue;

			if (query && !config.label.toLowerCase().includes(query)) {
				continue;
			}

			const cateryGroup = groups[config.category] ?? {};

			cateryGroup[key] = config;
			groups[config.category] = cateryGroup;
		}
		return groups;
	});

	const formatCategoryLabel = (category: string) => {
		return category
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};
</script>

<template>
	<div class="flex flex-col h-max overflow-auto">
		<div class="border-b border-gray-100 px-4 py-3 shrink-0 flex flex-col gap-3">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-800">Asset Library</h2>
			<TextInput
				v-model="searchQuery"
				placeholder="Search shapes..."
				size="sm"
			/>
		</div>
		<div class="flex-1 space-y-5 overflow-y-auto py-2">
			<div
				v-for="(configs, category) in groupedNodes"
				:key="category"
				class="space-y-2"
			>
				<h3 class="text-xs font-medium uppercase text-gray-500">
					{{ formatCategoryLabel(category) }}
				</h3>
				<div class="grid grid-cols-4 gap-2">
					<component
						:is="config.paletteComponent"
						v-for="(config, key) in configs"
						:id="config.id"
						:key="key"
						:type="key"
						:label="config.label"
						:category="config.category"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
