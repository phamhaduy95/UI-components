import { useClipboard } from '@/modules/designer/composables/useClipboard';
import { useHistory } from '@/modules/designer/composables/useHistory';
import { useVueFlow } from '@vue-flow/core';
import { ref } from 'vue';

import { defineStore } from 'pinia';

import { useNodeCommandFactory } from './useCommandFactory';

const MODIFIER_KEYS = ['ctrlCmd', 'ctrl', 'cmd', 'alt', 'shift', 'meta'];

export const useKeyboardStore = defineStore('design-keyboard', () => {
	const shortcuts = ref<Map<string, (e: KeyboardEvent) => void>>(new Map());

	const registerShortcut = (keys: string[], handler: (e: KeyboardEvent) => void) => {
		shortcuts.value.set(generateKey(keys), handler);
	};

	const registerManyShortcuts = (keys: Array<string[]>, handler: (e: KeyboardEvent) => void) => {
		keys.forEach((key) => {
			registerShortcut(key, handler);
		});
	};

	const getShortcut = (keys: string[]) => {
		const key = generateKey(keys);
		return shortcuts.value.get(key);
	};

	const generateKey = (keys: string[]): string => {
		const modifiers = keys.filter((k) => MODIFIER_KEYS.includes(k));
		const regularKeys = keys.filter((k) => !MODIFIER_KEYS.includes(k));

		modifiers.sort((a, b) => MODIFIER_KEYS.indexOf(a) - MODIFIER_KEYS.indexOf(b));

		return [...modifiers, ...regularKeys].join('+').toLowerCase();
	};

	return {
		shortcuts,
		registerShortcut,
		getShortcut,
		generateKey,
		registerManyShortcuts
	};
});

export const useKeyboardBindings = () => {
	const store = useKeyboardStore();

	const { copyNodes, pasteNodes, canCopy, canPaste } = useClipboard();
	const { undo, redo, canUndo, canRedo, commit } = useHistory();
	const { screenToFlowCoordinate, getSelectedNodes, getSelectedEdges, getConnectedEdges } =
		useVueFlow();
	const { createDeleteMultipleEntitiesCommand } = useNodeCommandFactory();

	const mousePos = ref({ x: 0, y: 0 });

	const handleMouseMove = (e: MouseEvent) => {
		mousePos.value.x = e.clientX;
		mousePos.value.y = e.clientY;
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		// Ignore if the user is typing in an input or textarea
		const target = event.target as HTMLElement;
		if (
			target &&
			(target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
		) {
			return;
		}

		const pressedKey = event.key.toLowerCase();

		const isCtrlPressed = event.ctrlKey || event.metaKey;
		const isAltPressed = event.altKey;
		const isShiftPressed = event.shiftKey;

		const combinedKeys = [];

		if (isCtrlPressed) combinedKeys.push('ctrlCmd');
		if (isAltPressed) combinedKeys.push('alt');
		if (isShiftPressed) combinedKeys.push('shift');

		const isRegularKey = !MODIFIER_KEYS.includes(pressedKey);

		if (!isRegularKey) return;

		combinedKeys.push(pressedKey);

		const handler = store.getShortcut(combinedKeys);

		if (handler) {
			handler(event);
		}
	};

	const registerBasicShortcuts = () => {
		store.registerManyShortcuts([['delete'], ['backspace']], (e) => {
			e.preventDefault();
			const nodes = getSelectedNodes.value;
			const edges = getSelectedEdges.value;
			if (!nodes.length && !edges.length) return;
			const connectedEdges = getConnectedEdges(nodes);
			const removeEdges = connectedEdges.filter((e) => !edges.includes(e));
			const command = createDeleteMultipleEntitiesCommand({
				nodes,
				edges: [...edges, ...removeEdges]
			});
			commit(command);
		});

		store.registerShortcut(['ctrlCmd', 'c'], (e) => {
			e.preventDefault();
			if (canCopy.value) {
				copyNodes();
			}
		});
		store.registerShortcut(['ctrlCmd', 'v'], (e) => {
			e.preventDefault();
			if (canPaste.value) {
				const position = screenToFlowCoordinate({
					x: mousePos.value.x,
					y: mousePos.value.y
				});
				pasteNodes({ position });
			}
		});

		store.registerShortcut(['ctrlCmd', 'z'], (e) => {
			e.preventDefault();
			if (canUndo.value) {
				undo();
			}
		});

		store.registerShortcut(['ctrlCmd', 'y'], (e) => {
			e.preventDefault();
			if (canRedo.value) {
				redo();
			}
		});

		store.registerShortcut(['ctrlCmd', 'shift', 'z'], (e) => {
			e.preventDefault();
			if (canRedo.value) {
				redo();
			}
		});
	};

	const register = () => {
		registerBasicShortcuts();
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('mousemove', handleMouseMove);
	};

	const unregister = () => {
		window.removeEventListener('keydown', handleKeyDown);
		window.removeEventListener('mousemove', handleMouseMove);
	};

	return {
		registerShortcut: store.registerShortcut,
		register,
		unregister
	};
};
