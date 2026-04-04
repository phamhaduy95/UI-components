<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
	import { Pagination as ArkPagination } from '@ark-ui/vue/pagination';
	import {
		ChevronLeftIcon,
		ChevronRightIcon,
		ChevronDoubleLeftIcon,
		ChevronDoubleRightIcon
	} from '@heroicons/vue/20/solid';
	import type { PaginationProps, PaginationEmits, PaginationSlots } from './Pagination.type';

	import '@packages/styles/components/Pagination.css';

	withDefaults(defineProps<PaginationProps>(), {
		page: undefined,
		defaultPage: undefined,
		pageSize: undefined,
		siblingCount: 1,
		showFirstTrigger: false,
		showLastTrigger: false
	});

	defineSlots<PaginationSlots>();

	const emit = defineEmits<PaginationEmits>();

	const handlePageChange: InstanceType<typeof ArkPagination.Root>['$props']['onPageChange'] = (
		details
	) => {
		emit('update:page', details.page);
		emit('pageChange', { page: details.page, pageSize: details.pageSize });
	};
</script>

<template>
	<ArkPagination.Root
		class="Pagination"
		:count="count"
		:page="page"
		:default-page="defaultPage"
		:page-size="pageSize"
		:sibling-count="siblingCount"
		:data-testid="dataTestid"
		@page-change="handlePageChange"
	>
		<ArkPagination.Context v-slot="{ pages }">
			<ArkPagination.FirstTrigger
				v-if="showFirstTrigger"
				class="Pagination_Trigger"
			>
				<slot name="firstTrigger">
					<ChevronDoubleLeftIcon />
				</slot>
			</ArkPagination.FirstTrigger>
			<ArkPagination.PrevTrigger class="Pagination_Trigger">
				<slot name="prevTrigger">
					<ChevronLeftIcon />
				</slot>
			</ArkPagination.PrevTrigger>

			<template
				v-for="(page, index) in pages"
				:key="index"
			>
				<ArkPagination.Item
					v-if="page.type === 'page'"
					class="Pagination_Item"
					:type="page.type"
					:value="page.value"
				>
					{{ page.value }}
				</ArkPagination.Item>

				<ArkPagination.Ellipsis
					v-else
					class="Pagination_Ellipsis"
					:index="index"
				>
					&#8230;
				</ArkPagination.Ellipsis>
			</template>

			<ArkPagination.NextTrigger class="Pagination_Trigger">
				<slot name="nextTrigger">
					<ChevronRightIcon />
				</slot>
			</ArkPagination.NextTrigger>

			<ArkPagination.LastTrigger
				v-if="showLastTrigger"
				class="Pagination_Trigger"
			>
				<slot name="lastTrigger">
					<ChevronDoubleRightIcon />
				</slot>
			</ArkPagination.LastTrigger>
		</ArkPagination.Context>
	</ArkPagination.Root>
</template>
