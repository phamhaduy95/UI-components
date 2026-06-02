<script setup lang="ts">
	import { useNodeCommandFactory } from '@/modules/designer/composables/useCommandFactory';
	import { useHistory } from '@/modules/designer/composables/useHistory';
	import { useShapeSelectionDialog } from '@/modules/designer/composables/useShapeSelectionDialog';
	import { nodeConfigMap } from '@/modules/designer/constant/nodeConfig';
	import { NodeCategory } from '@/modules/designer/types/Node.type';
	import { generateNode } from '@/modules/designer/utils/node.utils';
	import { computed, onMounted, onUnmounted, ref } from 'vue';

	const { shapeSelectorState, closeShapeSelection: closeShapeSelector } = useShapeSelectionDialog();
	const { commit } = useHistory();
	const { createAddNodesCommand } = useNodeCommandFactory();

	const style = computed(() => ({
		top: `${shapeSelectorState.y}px`,
		left: `${shapeSelectorState.x}px`
	}));

	const availableShapes = computed(() => {
		return Object.entries(nodeConfigMap)
			.filter(([_, config]) => config.category !== NodeCategory.Group)
			.map(([key, config]) => ({ key, ...config }));
	});

	const selectShape = (shapeKey: string, category: NodeCategory) => {
		if (!shapeSelectorState.flowPosition || !shapeSelectorState.tag) return;

		const node = generateNode({
			type: shapeKey,
			position: shapeSelectorState.flowPosition,
			data: {
				category,
				tagIds: [shapeSelectorState.tag.id],
				showTag: true
			}
		});

		// Use command factory to support history!
		commit(createAddNodesCommand([node]));

		closeShapeSelector();
	};

	const popupRef = ref<HTMLElement | null>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (
			shapeSelectorState.visible &&
			popupRef.value &&
			!popupRef.value.contains(event.target as Node)
		) {
			closeShapeSelector();
		}
	};

	onMounted(() => {
		document.addEventListener('mousedown', handleClickOutside);
	});

	onUnmounted(() => {
		document.removeEventListener('mousedown', handleClickOutside);
	});
</script>

<template>
	<div
		v-if="shapeSelectorState.visible"
		ref="popupRef"
		class="fixed z-100 bg-white rounded-lg shadow-xl border border-gray-200 p-3 w-72"
		:style="style"
	>
		<div class="flex justify-between items-center mb-3 px-1 border-b border-gray-100 pb-2">
			<span class="text-xs font-semibold text-gray-700 uppercase tracking-wider">
				Select Shape to Bind Tag
			</span>
			<button
				class="text-gray-400 hover:text-gray-600 transition-colors"
				@click="closeShapeSelector"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line
						x1="18"
						y1="6"
						x2="6"
						y2="18"
					></line>
					<line
						x1="6"
						y1="6"
						x2="18"
						y2="18"
					></line>
				</svg>
			</button>
		</div>
		<div class="grid grid-cols-4 gap-2">
			<component
				:is="shape.paletteComponent"
				v-for="shape in availableShapes"
				:id="shape.id"
				:key="shape.key"
				:type="shape.key"
				:label="shape.label"
				:category="shape.category"
				class="cursor-pointer! hover:bg-gray-50 rounded"
				@click="selectShape(shape.key, shape.category)"
			/>
		</div>
	</div>
</template>
