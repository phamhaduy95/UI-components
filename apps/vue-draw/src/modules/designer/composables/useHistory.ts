import { computed, nextTick, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Command } from '@/modules/designer/types/Command.type';

const MAX_HISTORY_STACK = 50;

export const useHistoryStore = defineStore('designer-history', () => {
	const undoStack = ref<Command[]>([]);
	const redoStack = ref<Command[]>([]);
	const isRestoring = ref<boolean>(false);

	const pushUndo = (command: Command, isRestoring?: boolean) => {
		undoStack.value.push(command);
		if (undoStack.value.length > MAX_HISTORY_STACK) {
			undoStack.value.shift();
		}
		if (!isRestoring) {
			redoStack.value = [];
		}
	};

	const popUndo = (): Command | undefined => undoStack.value.pop();

	const pushRedo = (command: Command) => {
		redoStack.value.push(command);
		if (redoStack.value.length > MAX_HISTORY_STACK) {
			redoStack.value.shift();
		}
	};

	const popRedo = (): Command | undefined => redoStack.value.pop();

	const clear = () => {
		undoStack.value = [];
		redoStack.value = [];
	};

	return { isRestoring, undoStack, redoStack, pushUndo, popUndo, pushRedo, popRedo, clear };
});

export const useHistory = () => {
	const store = useHistoryStore();

	const commit = (command: Command) => {
		if (store.isRestoring) return;
		command.forward();
		store.pushUndo(command);
	};

	const undo = async () => {
		const command = store.popUndo();
		if (!command) return;
		store.isRestoring = true;

		command.revert();

		store.pushRedo(command);
		await nextTick();
		store.isRestoring = false;
	};

	const redo = async () => {
		const command = store.popRedo();
		if (!command) return;
		store.isRestoring = true;
		command.forward();
		store.pushUndo(command, true);
		await nextTick();
		store.isRestoring = false;
	};

	const canUndo = computed(() => store.undoStack.length > 0);
	const canRedo = computed(() => store.redoStack.length > 0);

	const clear = () => store.clear();

	return { commit, undo, redo, canUndo, canRedo, clear };
};
