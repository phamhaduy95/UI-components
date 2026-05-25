<script lang="ts" setup>
	import { ColorPicker as ArkColorPicker } from '@ark-ui/vue/color-picker';
	import type { ColorPickerColorFormat } from './ColorPicker.type';
	import { generateColorStringValue } from './ColorPicker.util';

	interface ColorPickerTextValueProps {
		format: ColorPickerColorFormat;
	}

	defineProps<ColorPickerTextValueProps>();
</script>

<template>
	<ArkColorPicker.Context v-slot="{ value }">
		<div class="ColorPicker_ValueText">
			{{ generateColorStringValue(value, format) }}
		</div>
	</ArkColorPicker.Context>
</template>
