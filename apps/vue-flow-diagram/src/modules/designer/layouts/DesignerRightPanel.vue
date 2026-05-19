<script setup lang="ts">
// In the future, we can add props for selected node properties
</script>

<template>
	<aside
		class="z-10 flex w-72 shrink-0 flex-col border-l border-gray-200 bg-white shadow-[-2px_0_5px_rgba(0,0,0,0.02)]"
	>
		<div class="border-b border-gray-100 px-4 py-3">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-800">Properties</h2>
		</div>
		<div class="flex-1 space-y-6 overflow-y-auto p-4">
			<div class="space-y-3">
				<h3 class="text-xs font-medium uppercase tracking-wide text-gray-500">Layout</h3>
				<div class="grid grid-cols-2 gap-3">
					<div>
						<label class="mb-1 block text-xs text-gray-500">X</label>
						<input
							type="number"
							value="250"
							class="w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label class="mb-1 block text-xs text-gray-500">Y</label>
						<input
							type="number"
							value="50"
							class="w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label class="mb-1 block text-xs text-gray-500">W</label>
						<input
							type="number"
							value="100"
							class="w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label class="mb-1 block text-xs text-gray-500">H</label>
						<input
							type="number"
							value="60"
							class="w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
					</div>
				</div>
			</div>

			<!-- Appearance -->
			<div class="space-y-3">
				<h3 class="text-xs font-medium uppercase tracking-wide text-gray-500">Appearance</h3>
				<div>
					<label class="mb-1 block text-xs text-gray-500">Background</label>
					<div class="flex items-center space-x-2">
						<div class="h-8 w-8 rounded border border-gray-300 bg-white"></div>
						<input
							type="text"
							value="#FFFFFF"
							class="flex-1 rounded border border-gray-300 px-2 py-1.5 text-sm uppercase focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
					</div>
				</div>
				<div>
					<label class="mb-1 block text-xs text-gray-500">Border</label>
					<div class="flex items-center space-x-2">
						<div class="h-8 w-8 rounded border border-gray-300 bg-gray-700"></div>
						<input
							type="text"
							value="#777777"
							class="flex-1 rounded border border-gray-300 px-2 py-1.5 text-sm uppercase focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
					</div>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-sm text-gray-700">Border Radius</span>
					<input
						type="number"
						value="4"
						class="w-16 rounded border border-gray-300 px-2 py-1 text-right text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
					/>
				</div>
			</div>
		</div>
	</aside>
</template>
