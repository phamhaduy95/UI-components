<script setup lang="ts"></script>

<template>
	<div class="p-8">
		<h2 class="mb-6 text-2xl font-bold text-gray-900">Settings</h2>
		<div class="max-w-3xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<div class="space-y-6">
				<div class="border-b border-gray-100 pb-6">
					<h3 class="mb-4 text-lg font-medium text-gray-800">General Profile</h3>
					<div class="grid gap-4">
						<div>
							<label class="mb-1 block text-sm font-medium text-gray-700">Display Name</label>
							<input
								type="text"
								value="Pham Duy"
								class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label class="mb-1 block text-sm font-medium text-gray-700">Email</label>
							<input
								type="email"
								value="ph.duy@mail.com"
								class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>
				</div>

				<div class="border-b border-gray-100 pb-6">
					<h3 class="mb-4 text-lg font-medium text-gray-800">Preferences</h3>
					<div class="flex items-center justify-between">
						<div>
							<p class="font-medium text-gray-700">Dark Mode</p>
							<p class="text-sm text-gray-500">Switch to a dark UI theme.</p>
						</div>
						<button
							class="relative h-6 w-11 rounded-full bg-gray-200 transition-colors focus:outline-none"
							aria-checked="false"
						>
							<span
								class="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform"
							></span>
						</button>
					</div>
				</div>

				<div>
					<button
						class="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
					>
						Save Settings
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
