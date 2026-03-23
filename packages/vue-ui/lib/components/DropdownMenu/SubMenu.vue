<script setup lang="ts">
	import { Menu } from '@ark-ui/vue/menu';
	import { ChevronRightIcon } from '@heroicons/vue/20/solid';
	import type { NestedMenu } from './DropdownMenu.type';

	defineProps<NestedMenu>();
</script>

<template>
	<Menu.Root>
		<Menu.TriggerItem
			class="Menu_Item"
			:aria-label="label"
		>
			{{ label }}
			<ChevronRightIcon class="Menu_ExpandItemIcon" />
		</Menu.TriggerItem>
		<Menu.Positioner>
			<Menu.Content class="Menu">
				<template
					v-for="item in items"
					:key="item.value"
				>
					<SubMenu
						v-if="item.type === 'nested'"
						v-bind="item"
					/>
					<Menu.Item
						v-else
						class="Menu_Item"
						:disabled="item.disabled"
						:value="item.value"
						:aria-label="item.label"
					>
						{{ item.label }}
					</Menu.Item>
				</template>
			</Menu.Content>
		</Menu.Positioner>
	</Menu.Root>
</template>
