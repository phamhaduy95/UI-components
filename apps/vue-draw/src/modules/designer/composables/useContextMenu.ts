import { ref } from 'vue';
import type { ComponentInstance } from 'vue';
import { VueFlow } from '@vue-flow/core';
import { defineStore, storeToRefs } from 'pinia';

type VueFlowProps = ComponentInstance<typeof VueFlow>['$props'];

const useContextMenuStore = defineStore('design-context-menu', () => {
	const contextMenu = ref({ visible: false, x: 0, y: 0, nodeId: '' });

	const open = (x: number, y: number, nodeId: string) => {
		contextMenu.value = { visible: true, x, y, nodeId };
	};

	const close = () => {
		contextMenu.value.visible = false;
	};

	return {
		contextMenu,
		open,
		close
	};
});

export const useContextMenu = () => {
	const store = useContextMenuStore();
	const { contextMenu } = storeToRefs(store);

	const onNodeContextMenu: VueFlowProps['onNodeContextMenu'] = (event) => {
		const mouseEvent = event.event as PointerEvent;
		mouseEvent.preventDefault();

		store.open(mouseEvent.clientX, mouseEvent.clientY, event.node.id);
	};

	const closeContextMenu = () => {
		store.close();
	};

	return {
		contextMenu,
		onNodeContextMenu,
		closeContextMenu
	};
};
