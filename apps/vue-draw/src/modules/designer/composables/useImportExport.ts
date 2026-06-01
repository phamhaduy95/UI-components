import { useVueFlow } from '@vue-flow/core';

export const useImportExport = () => {
	const { toObject, fromObject } = useVueFlow();

	const exportGraph = () => {
		const flow = toObject();
		const jsonString = JSON.stringify(flow, null, 2);
		const blob = new Blob([jsonString], { type: 'application/json' });
		const url = URL.createObjectURL(blob);

		const linkElement = document.createElement('a');
		linkElement.href = url;
		linkElement.download = 'vue-draw-graph.json';
		document.body.appendChild(linkElement);
		linkElement.click();

		document.body.removeChild(linkElement);
		URL.revokeObjectURL(url);
	};

	const importGraph = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'application/json';
		input.onchange = async (event) => {
			const file = (event.target as HTMLInputElement).files?.[0];
			if (file) {
				try {
					const text = await file.text();
					const flow = JSON.parse(text);
					if (flow) {
						fromObject(flow);
					}
				} catch {
					/* empty */
				}
			}
		};
		input.click();
	};

	return {
		exportGraph,
		importGraph
	};
};
