// @ts-check
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import path from 'path';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

export default defineConfig({
	integrations: [
		react(),
		mdx({
			// add class name to output html tags from markdown for custom styling
			// https://mdxjs.com/packages/remark-rehype/#handlers
			remarkRehype: {
				handlers: {
					table(state, node) {
						return {
							type: 'element',
							tagName: 'Table',
							properties: {
								className: ['mdx-table']
							},
							children: state.all(node)
						};
					},

					inlineCode(_, node) {
						return {
							type: 'element',
							tagName: 'code',
							properties: {
								className: ['mdx-inline-code']
							},
							children: [
								{
									type: 'text',
									value: node.value
								}
							]
						};
					},
					heading(state, node) {
						const tagName = `h${node.depth}`;
						return {
							type: 'element',
							tagName,
							properties: {
								className: ['mdx-heading']
							},
							children: state.all(node)
						};
					},
					paragraph(state, node) {
						return {
							type: 'element',
							tagName: 'p',
							properties: {
								className: ['mdx-paragraph']
							},
							children: state.all(node)
						};
					},
					thematicBreak() {
						return {
							type: 'element',
							tagName: 'hr',
							properties: {
								className: ['mdx-hr']
							},
							children: []
						};
					}
				}
			}
		})
	],

	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				src: path.resolve(path.dirname('.'), './src'),
				'@styles': path.resolve(path.dirname('.'), './src/styles'),
				'@pages': path.resolve(path.dirname('.'), './src/pages'),
				'@components': path.resolve(path.dirname('.'), './src/components')
			}
		}
	}
});
