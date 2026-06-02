import { ref, computed, onMounted, onUnmounted } from 'vue';

export const useKeyModifiers = () => {
	const shift = ref(false);
	const ctrl = ref(false);
	const alt = ref(false);
	const meta = ref(false);

	const isModifierPressed = computed(() => shift.value || ctrl.value || alt.value || meta.value);

	const updateModifiers = (e: KeyboardEvent) => {
		shift.value = e.shiftKey;
		ctrl.value = e.ctrlKey;
		alt.value = e.altKey;
		meta.value = e.metaKey;
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		updateModifiers(e);
	};

	const handleKeyUp = (e: KeyboardEvent) => {
		updateModifiers(e);
	};

	const handleBlur = () => {
		shift.value = false;
		ctrl.value = false;
		alt.value = false;
		meta.value = false;
	};

	onMounted(() => {
		window.addEventListener('keydown', handleKeyDown, { passive: true });
		window.addEventListener('keyup', handleKeyUp, { passive: true });
		window.addEventListener('blur', handleBlur);
	});

	onUnmounted(() => {
		window.removeEventListener('keydown', handleKeyDown);
		window.removeEventListener('keyup', handleKeyUp);
		window.removeEventListener('blur', handleBlur);
	});

	return {
		shift,
		ctrl,
		alt,
		meta,
		isModifierPressed
	};
};
