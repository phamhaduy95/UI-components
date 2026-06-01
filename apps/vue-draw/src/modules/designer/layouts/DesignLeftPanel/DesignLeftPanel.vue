<script setup lang="ts">
	import { computed } from 'vue';
	import { Tabs, TextInput } from '@packages/vue-components';
	import { nodeConfigMap } from '@/modules/designer/constant/nodeConfig';
	import { NodeCategory } from '@/modules/designer/types/Node.type';
	import { useDnD } from '@/modules/designer/composables/useDnD';
	import { useTagsStore } from '@/modules/designer/composables/useTagsStore';

	const groupedNodes = computed(() => {
		const groups: Record<string, typeof nodeConfigMap> = {};
		for (const [key, config] of Object.entries(nodeConfigMap)) {
			if (config.category === NodeCategory.Group) continue;

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

	const tabItems = [
		{ value: 'nodes', title: 'Nodes' },
		{ value: 'tags', title: 'Tags' }
	];

	const { onPaletteDragStart } = useDnD();
	const tagsStore = useTagsStore();
</script>

<template>
	<aside
		class="z-10 flex w-64 shrink-0 flex-col border-r border-gray-200 bg-white shadow-[2px_0_5px_rgba(0,0,0,0.02)]"
	>
		<Tabs
			class="flex-1 flex flex-col overflow-hidden"
			:items="tabItems"
			default-value="nodes"
		>
			<template #content-nodes>
				<div class="flex flex-col h-full">
					<div class="border-b border-gray-100 px-4 py-3 shrink-0">
						<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-800">
							Asset Library
						</h2>
					</div>
					<div class="flex-1 space-y-5 overflow-y-auto p-4">
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
			<template #content-tags>
				<div class="flex flex-col h-full">
					<div class="border-b border-gray-100 px-4 py-3 shrink-0">
						<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-800">Value Tags</h2>
					</div>
					<ul class="p-4 flex-1 space-y-3 overflow-y-auto">
						<li
							v-for="tag in tagsStore.tags"
							:key="tag.id"
							class="flex flex-col gap-1 p-2 bg-gray-50 border border-gray-200 rounded cursor-grab active:cursor-grabbing"
							draggable="true"
							@dragstart="onPaletteDragStart($event, { isTag: true, tag } as any)"
						>
							<span class="text-xs font-semibold text-gray-700">{{ tag.label }}</span>
							<TextInput
								v-model="tag.value"
								size="sm"
								@pointerdown.stop
								@mousedown.stop
							/>
						</li>
					</ul>
				</div>
			</template>
		</Tabs>
	</aside>
</template>
