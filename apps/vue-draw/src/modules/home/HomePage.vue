<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import { Button } from '@packages/vue-components';
	import IconLayers from '@/assets/images/layers.svg';
	import IconLayout from '@/assets/images/layout.svg';
	import IconFileText from '@/assets/images/file-text.svg';

	const router = useRouter();

	const navigateToDesigner = () => {
		router.push('/designer');
	};
</script>

<template>
	<div class="flex h-full w-full flex-col overflow-y-auto bg-white">
		<!-- Hero Section -->
		<section
			class="bg-linear-to-b flex flex-1 flex-col items-center justify-center from-blue-50 to-white px-6 py-20 text-center"
		>
			<h1 class="mb-6 text-5xl font-extrabold tracking-tight text-gray-900">
				Design Vector Drawings <br />
				<span class="text-blue-600">With Drag & Drop Ease</span>
			</h1>
			<p class="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-600">
				VueDraw is a modern, web-based design environment. Build diagrams faster with powerful
				tools, intuitive layouts, and Vue Flow integration.
			</p>
			<div class="flex gap-4">
				<Button
					color="primary"
					variant="contained"
					size="lg"
					@click="navigateToDesigner"
				>
					Open Designer
				</Button>
				<Button
					color="secondary"
					variant="outlined"
					size="lg"
				>
					View Documentation
				</Button>
			</div>
		</section>

		<!-- Features Section -->
		<section class="mx-auto w-full max-w-6xl px-6 py-20">
			<div class="mb-16 text-center">
				<h2 class="text-3xl font-bold text-gray-900">Powerful Features for Industrial Design</h2>
				<p class="mt-4 text-lg text-gray-500">
					Everything you need to build stunning HMI dashboards.
				</p>
			</div>

			<div class="grid gap-10 md:grid-cols-3">
				<!-- Feature 1 -->
				<div
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
				>
					<div
						class="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600"
					>
						<IconLayers class="h-6 w-6" />
					</div>
					<h3 class="mb-3 text-xl font-semibold text-gray-900">Rich Asset Library</h3>
					<p class="leading-relaxed text-gray-600">
						Drag and drop industrial components like pumps, tanks, pipes, and valves straight onto
						your canvas.
					</p>
				</div>

				<!-- Feature 2 -->
				<div
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
				>
					<div
						class="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600"
					>
						<IconLayout class="h-6 w-6" />
					</div>
					<h3 class="mb-3 text-xl font-semibold text-gray-900">Grid-Aligned Workspace</h3>
					<p class="leading-relaxed text-gray-600">
						A powerful canvas powered by Vue Flow with snapping, grouping, undo/redo, and precise
						object manipulation.
					</p>
				</div>

				<!-- Feature 3 -->
				<div
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
				>
					<div
						class="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600"
					>
						<IconFileText class="h-6 w-6" />
					</div>
					<h3 class="mb-3 text-xl font-semibold text-gray-900">Advanced Properties</h3>
					<p class="leading-relaxed text-gray-600">
						Instantly adjust object parameters, styles, and data bindings via an intuitive
						properties panel.
					</p>
				</div>
			</div>
		</section>

		<!-- Footer -->
		<footer class="mt-auto border-t border-gray-200 bg-gray-50 px-6 py-8 text-center">
			<div class="mb-4 flex items-center justify-center space-x-6">
				<a
					href="#"
					class="text-gray-500 transition-colors hover:text-gray-900"
					>Documentation</a
				>
				<a
					href="#"
					class="text-gray-500 transition-colors hover:text-gray-900"
					>Support</a
				>
				<a
					href="#"
					class="text-gray-500 transition-colors hover:text-gray-900"
					>Terms</a
				>
			</div>
			<p class="text-sm text-gray-400">&copy; 2026 VueDraw. All rights reserved.</p>
		</footer>
	</div>
</template>
