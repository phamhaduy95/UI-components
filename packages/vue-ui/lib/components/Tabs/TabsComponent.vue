<script setup lang="ts">
	import { Tabs as ArkTabs } from '@ark-ui/vue/tabs';
	import { XMarkIcon } from '@heroicons/vue/20/solid';
	import type { TabsProps, TabsEmits, TabsSlots } from './Tabs.type';

	import '@packages/styles/components/Tabs.css';
	import { IconButton } from '@components/IconButton';

	type TabsRootType = InstanceType<typeof ArkTabs.Root>;

	withDefaults(defineProps<TabsProps>(), {
		activationMode: 'automatic',
		orientation: 'horizontal',
		lazyMount: false,
		unmountOnExit: false,
		closable: false,
		modelValue: undefined
	});

	const emit = defineEmits<TabsEmits>();

	defineSlots<TabsSlots>();

	const handleValueChange: TabsRootType['onValueChange'] = (details) => {
		emit('update:modelValue', details.value);
		emit('valueChange', details.value);
	};
</script>

<template>
	<ArkTabs.Root
		class="Tabs"
		:model-value="modelValue"
		:default-value="defaultValue"
		:activation-mode="activationMode"
		:orientation="orientation"
		:lazy-mount="lazyMount"
		:unmount-on-exit="unmountOnExit"
		:data-testid="dataTestid"
		@value-change="handleValueChange"
	>
		<ArkTabs.List class="Tabs_List">
			<ArkTabs.Trigger
				v-for="item in items"
				:key="item.value"
				class="Tabs_Trigger"
				:value="item.value"
				:disabled="item.disabled"
				:tabindex="item.disabled ? undefined : 0"
				:aria-label="item.title ?? item['aria-label']"
			>
				<slot
					name="title"
					:item="item"
				>
					{{ item.title }}
				</slot>
				<IconButton
					v-if="closable && !item.disabled"
					class="Tabs_CloseButton"
					aria-label="close tab"
					variant="text"
					size="sm"
					color="secondary"
					tabindex="0"
					@click.stop="emit('close', item.value)"
				>
					<XMarkIcon />
				</IconButton>
			</ArkTabs.Trigger>
			<ArkTabs.Indicator class="Tabs_Indicator" />
		</ArkTabs.List>

		<ArkTabs.Content
			v-for="item in items"
			:key="item.value"
			class="Tabs_Content"
			:value="item.value"
		>
			<slot
				v-if="$slots[`content-${item.value}`]"
				:name="`content-${item.value}`"
				:item="item"
			/>
			<template v-else>
				<slot
					:name="'content'"
					:item="item"
				/>
			</template>
		</ArkTabs.Content>
	</ArkTabs.Root>
</template>
