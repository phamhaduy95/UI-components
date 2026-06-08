<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { TextInput, Accordion } from '@packages/vue-components';
	import type { AccordionItemObject } from '@packages/vue-components';
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

	const accordionItems = computed<AccordionItemObject[]>(() => {
		return Object.keys(groupedNodes.value).map((category) => ({
			value: category,
			title: formatCategoryLabel(category)
		}));
	});

	const expandedCategories = ref<string[]>(Object.keys(groupedNodes.value));
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
		<div class="flex-1 overflow-y-auto py-2">
			<Accordion
				v-model="expandedCategories"
				:items="accordionItems"
				multiple
				:animated="false"
			>
				<template #title="{ item }">
					<span class="text-xs font-medium uppercase text-gray-500">
						{{ item.title }}
					</span>
				</template>
				<template #content="{ item }">
					<div class="grid grid-cols-4 gap-2 pb-4 px-2">
						<component
							:is="config.paletteComponent"
							v-for="(config, key) in groupedNodes[item.value]"
							:id="config.id"
							:key="key"
							:type="key"
							:label="config.label"
							:category="config.category"
						/>
					</div>
				</template>
			</Accordion>
		</div>
	</div>
</template>
