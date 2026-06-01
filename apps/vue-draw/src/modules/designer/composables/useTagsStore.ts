import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TagData } from '@/modules/designer/types/Node.type';

export const useTagsStore = defineStore('tags', () => {
	const tags = ref<TagData[]>([
		{ id: 'tag-1', label: 'Customer Name', value: 'John Doe' },
		{ id: 'tag-2', label: 'Customer Email', value: 'john@example.com' },
		{ id: 'tag-3', label: 'Order Total', value: '$120.00' },
		{ id: 'tag-4', label: 'Status', value: 'Pending' }
	]);

	const updateTagValue = (id: string, value: string) => {
		const tag = tags.value.find((t) => t.id === id);
		if (tag) {
			tag.value = value;
		}
	};

	return {
		tags,
		updateTagValue
	};
});
