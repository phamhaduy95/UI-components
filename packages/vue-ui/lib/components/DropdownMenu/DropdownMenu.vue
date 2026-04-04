<script setup lang="ts">
	import { Menu } from '@ark-ui/vue/menu';
	import SubMenu from './SubMenu.vue';

	import type { DropdownMenuProps, DropdownMenuSlots } from './DropdownMenu.type';

	import '@packages/styles/components/DropDownMenu.css';

	withDefaults(defineProps<DropdownMenuProps>(), {
		items: () => []
	});

	defineSlots<DropdownMenuSlots>();
</script>

<template>
	<Menu.Root v-bind="$attrs">
		<Menu.Trigger
			as-child
			class="Menu_Trigger"
			:class="className"
		>
			<slot />
		</Menu.Trigger>
		<Teleport to="body">
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
							<slot
								name="item"
								:item="item"
							>
								{{ item.label }}
							</slot>
						</Menu.Item>
					</template>
				</Menu.Content>
			</Menu.Positioner>
		</Teleport>
	</Menu.Root>
</template>
