import { defineCollection } from 'astro:content';

import { glob } from 'astro/loaders';

const components = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/docs/components' })
});

export const collections = { components };
