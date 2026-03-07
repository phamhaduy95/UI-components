# Vue UI Component Guidelines

This guide outlines the standard practices, structures, and tools used for building components in the `vue-ui` package. It is heavily based on ensuring a 1:1 API and aesthetic parity with the equivalent `react-ui` package, while adopting idiomatic Vue 3 paradigms.

## 🛠 Tech Stack & Core Libraries

- **Framework:** Vue 3 (Composition API with `<script setup lang="ts">`)
- **Headless UI:** `@ark-ui/vue` (used for accessible primitives like Toggles, Inputs, Numbers, etc.)
- **Icons:** `@heroicons/vue/20/solid` (used to replace Radix UI icons found in the React package)
- **Styling:** Vanilla CSS, shared centrally via the `@packages/styles` workspace.

## 🏛 Component Architecture & Structure

When building a new component, you should closely examine its React equivalent (`packages/react-ui/lib/components/...`) and replicate its exact DOM structure, classes, and props into Vue.

### 1. File Structure

Each component should live inside `lib/components/<ComponentName>` across at least two main files:

- `ComponentName.vue` (The main implementation)
- `index.ts` (Barrel export file for the component and its typing)

Finally, export it from `lib/components/index.ts`:

```ts
export * from './ComponentName';
```

### 2. Styling (CSS)

Do **NOT** use `<style scoped>`. Instead, import the exact central stylesheet that is used by the `react-ui` component:

```vue
<script setup lang="ts">
import '@packages/styles/components/ComponentName.css';
</script>
```

Styles rely heavily on native HTML attributes (`disabled`, `required`) and data-attributes (`data-status`, `data-size`) rather than conditional component classes.

### 3. Setup & Prop Definitions

Use TypeScript interfaces to define props. Merge common prop interfaces (like `CommonFieldProps`) where appropriate.

```vue
<script setup lang="ts">
import type { CommonFieldProps } from '@components/type';

defineOptions({ inheritAttrs: false }); // Always disable inheritance to prevent root wrapping issues!

export interface ComponentNameProps extends CommonFieldProps<string> {
	modelValue?: string;
	size?: 'small' | 'medium' | 'large';
	// Add other specific props
}

const props = withDefaults(defineProps<ComponentNameProps>(), {
	size: 'medium'
	// Provide default fallbacks matching React defaultProps
});
</script>
```

**⚠️ Important:** We explicitly set `inheritAttrs: false`. This allows you to aggressively extract `$attrs` using `v-bind="$attrs"` and pass it specifically to the native HTML element (like `<input>` or `<button>`) rather than the wrapper `<div>`.

### 4. V-Model, Internal vs External State

Many form wrappers need to support Vue's native two-way bindings (v-model) via `modelValue`, whilst also gracefully supporting standard `value` and `defaultValue` interactions if used in uncontrolled modes.

A standard pattern to tackle this:

```ts
const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void;
	(e: 'valueChange', value: string): void;
}>();

// 1. Store uncontrolled state internally
const internalValue = ref(props.defaultValue || '');

// 2. Compute the exact value output, preferring the external prop if it exists
const inputValue = computed({
	get: () => (props.modelValue ?? props.value ?? internalValue.value) as string,
	set: (val: string) => {
		internalValue.value = val;
		emit('update:modelValue', val);
		emit('valueChange', val);
	}
});

// 3. Update the computation on change
const handleInputChanged = (e: Event) => {
	const target = e.target as HTMLInputElement;
	inputValue.value = target.value;
};
```

Bind `:value="inputValue"` instead of `props.value` into your template.

### 5. Leveraging Ark UI

When a complex accessible node is needed (e.g. `PasswordInput`, `NumberInput`), use Ark UI's Vue exports. Use `as-child` on the Root nodes when you only wish to inject accessibility handlers, but keep the HTML hierarchy perfectly in line with our custom design implementation.

Example:

```vue
<template>
	<ArkToggle.Root :pressed="isPressed" as-child @update:pressed="handlePressedChange">
		<Button variant="isPressed ? 'contained' : 'outlined'">
			<ArkToggle.Context v-slot="context">
				<slot v-bind="context" />
			</ArkToggle.Context>
		</Button>
	</ArkToggle.Root>
</template>
```

### 6. Reusing Higher-Level Layouts

Any standard form input should always be wrapped in the `BaseField` component (`@components/BaseField`).
The `BaseField` automatically implements the `FieldLabel`, standard layouts, error indicators/formatting (`data-invalid`), and `SupportingText`.

Inside your input components, generate `useId()` pairings and hand them vertically to `BaseField` to satisfy aria-description bindings cleanly.

### 7. Icons

React generally leverages `@radix-ui/react-icons`. When porting these components to Vue, prefer using `@heroicons/vue/20/solid` to replicate these icons rather than creating inline raw SVG blobs.

Example conversions:

- Radix `Cross2Icon` => Heroicon `XMarkIcon`
- Radix `EyeOpenIcon` / `EyeClosedIcon` => Heroicon `EyeIcon` / `EyeSlashIcon`
- Radix `ChevronUpIcon` / `ChevronDownIcon` => Heroicon `ChevronUpIcon` / `ChevronDownIcon`
