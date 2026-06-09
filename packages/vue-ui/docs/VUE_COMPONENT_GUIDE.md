# Vue UI Component Guidelines

Guidelines for building components in the `vue-ui` package, maintaining 1:1 API and aesthetic parity with `react-ui` using Vue 3 paradigms.

## 🛠 Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Headless UI:** `@ark-ui/vue` (accessible primitives)
- **Icons:** `@heroicons/vue/20/solid`
- **Styling:** Vanilla CSS from `@packages/styles`

## 🏛 Component Structure

Replicate the exact DOM structure, classes, and props of the equivalent React component.

### 1. File Structure

Each component lives in `lib/components/<ComponentName>` across three files:

- `<ComponentName>.vue` or `Base<ComponentName>.vue`: Implementation
- `<ComponentName>.type.ts`: Props, slots, and emits
- `index.ts`: Barrel export

**Example `index.ts`:**

```ts
export { default as ComponentName } from './ComponentName.vue';
export type { ComponentNameProps, ComponentNameEmits } from './ComponentName.type';
```

_(Remember to also export it in `lib/components/index.ts`)_

### 2. Styling

Do **NOT** use `<style scoped>`. Import the central stylesheet directly:

```ts
import '@packages/styles/components/ComponentName.css';
```

Rely on native HTML attributes (`disabled`, `required`) and data-attributes (`data-status`, `data-size`).

### 3. Setup & Props

Define props and emits in `<ComponentName>.type.ts`:

```ts
import type { CommonFieldProps } from '@components/BaseField';

export interface ComponentNameProps extends CommonFieldProps<string> {
	modelValue?: string;
	size?: 'sm' | 'md' | 'lg';
}

export type ComponentNameEmits = {
	'update:modelValue': [value: string];
	valueChange: [e: InputEvent];
};
```

Import them into the implementation:

```vue
<script setup lang="ts">
import type { ComponentNameProps, ComponentNameEmits } from './ComponentName.type';

defineOptions({ inheritAttrs: false }); // Prevent root wrapping issues

const props = withDefaults(defineProps<ComponentNameProps>(), { size: 'md' });
const emit = defineEmits<ComponentNameEmits>();
</script>
```

**⚠️ Important:** `inheritAttrs: false` allows passing `$attrs` directly to the native HTML element (e.g., `<input v-bind="$attrs">`) rather than the wrapper `<div>`.

### 4. V-Model & Internal State

Support `v-model` while gracefully handling uncontrolled mode (`defaultValue`):

```ts
const internalValue = ref(props.defaultValue || '');
const inputValue = computed(() => props.modelValue ?? internalValue.value);

const handleInput = (e: InputEvent) => {
	const val = (e.target as HTMLInputElement).value;
	internalValue.value = val;
	emit('update:modelValue', val);
	emit('valueChange', e);
};
```

_Bind `:value="inputValue"` instead of `props.value` in the template._

### 5. Ark UI

For complex accessible nodes, use `@ark-ui/vue` with `as-child` to maintain our custom HTML hierarchy while injecting accessibility features:

```vue
<ArkToggle.Root :pressed="isPressed" as-child @update:pressed="handlePressedChange">
	<Button variant="isPressed ? 'contained' : 'outlined'">
		<ArkToggle.Context v-slot="context">
			<slot v-bind="context" />
		</ArkToggle.Context>
	</Button>
</ArkToggle.Root>
```

### 6. BaseField Layout

Wrap standard form inputs in `BaseField` (`@components/BaseField`). It provides `FieldLabel`, error formatting (`data-invalid`), and `SupportingText`. Hand it `useId()` pairings for `aria-describedby` bindings.

### 7. Icons

Replace Radix UI icons (used in React) with `@heroicons/vue/20/solid`.

- `Cross2Icon` -> `XMarkIcon`
- `EyeOpenIcon` / `EyeClosedIcon` -> `EyeIcon` / `EyeSlashIcon`
- `ChevronUpIcon` / `ChevronDownIcon` -> `ChevronUpIcon` / `ChevronDownIcon`
