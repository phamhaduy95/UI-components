import type { Preview } from '@storybook/vue3-vite';
import '@packages/styles/themes/default.css';
import './global.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	}
};

export default preview;
