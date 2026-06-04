<script setup lang="ts">
	import { ref } from 'vue';
	import { RouterLink } from 'vue-router';
	import { IconButton } from '@packages/vue-components';

	import IconMenu from '@assets/navigation-icons/menu.svg';
	import IconHome from '@assets/navigation-icons/home.svg';
	import IconDesigner from '@assets/navigation-icons/designer.svg';
	import IconSettings from '@assets/navigation-icons/settings.svg';
	import IconLogo from '@assets/navigation-icons/logo.svg';

	const isSidebarOpen = ref(false);

	const toggleSidebar = () => {
		isSidebarOpen.value = !isSidebarOpen.value;
	};

	const iconMap: Record<string, string> = {
		home: IconHome,
		designer: IconDesigner,
		settings: IconSettings
	};

	const navItems = [
		{ name: 'Home', path: '/', icon: 'home' },
		{ name: 'Designer', path: '/designer', icon: 'designer' },
		{ name: 'Settings', path: '/settings', icon: 'settings' }
	];
</script>

<template>
	<div class="flex h-screen w-screen overflow-hidden bg-white text-gray-800">
		<!-- Left Navigation Sidebar -->
		<aside
			class="z-20 flex flex-col border-r border-gray-200 bg-gray-50 shadow-sm transition-all duration-300"
			:class="isSidebarOpen ? 'w-64' : 'w-16'"
		>
			<div class="flex h-14 items-center justify-between border-b border-gray-200 px-4">
				<span
					v-if="isSidebarOpen"
					class="whitespace-nowrap font-bold text-gray-700"
					>Menu</span
				>
				<IconButton
					variant="text"
					color="secondary"
					:class="isSidebarOpen ? '' : 'mx-auto'"
					aria-label="Toggle Sidebar"
					@click="toggleSidebar"
				>
					<IconMenu class="h-5 w-5" />
				</IconButton>
			</div>

			<nav class="flex-1 overflow-y-auto py-4">
				<ul class="space-y-2 px-2">
					<li
						v-for="item in navItems"
						:key="item.path"
					>
						<RouterLink
							:to="item.path"
							class="flex w-full items-center rounded-md px-3 py-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
							active-class="bg-blue-100 font-medium text-blue-700 hover:bg-blue-100 hover:text-blue-700"
							exact-active-class="bg-blue-100 font-medium text-blue-700 hover:bg-blue-100 hover:text-blue-700"
							:class="isSidebarOpen ? 'justify-start' : 'justify-center'"
							:title="!isSidebarOpen ? item.name : ''"
						>
							<div class="flex shrink-0 items-center justify-center">
								<component
									:is="iconMap[item.icon]"
									class="h-5 w-5"
								/>
							</div>
							<span
								v-if="isSidebarOpen"
								class="ml-3 truncate whitespace-nowrap"
							>
								{{ item.name }}
							</span>
						</RouterLink>
					</li>
				</ul>
			</nav>
		</aside>

		<!-- Main Content Area -->
		<div class="flex flex-1 flex-col overflow-hidden">
			<!-- Top Sidebar -->
			<header
				class="z-10 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm"
			>
				<div class="flex items-center space-x-3">
					<RouterLink
						to="/"
						class="flex h-10 w-10 items-center justify-center rounded-md bg-blue-600 p-2 text-white shadow-inner transition-transform duration-200"
					>
						<IconLogo class="h-full w-full" />
					</RouterLink>
					<h1 class="hidden text-lg font-semibold text-gray-800 sm:block">Drawing App</h1>
				</div>

				<div class="flex items-center space-x-4">
					<div class="flex items-center space-x-2">
						<div
							class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-indigo-200 bg-indigo-100 font-medium text-indigo-700 transition-colors hover:bg-indigo-200"
						>
							PD
						</div>
					</div>
				</div>
			</header>

			<!-- Content -->
			<main class="relative flex-1 overflow-hidden bg-gray-50">
				<slot />
			</main>
		</div>
	</div>
</template>

<style scoped>
	/* Optional custom scrollbar styling could go here */
</style>
