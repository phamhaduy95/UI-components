import { createRouter, createWebHistory } from 'vue-router';
import { HomePage } from '@modules/home';
import { DesignerPage } from '@modules/designer';
import { SettingsPage } from '@modules/settings';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomePage
		},
		{
			path: '/designer',
			name: 'designer',
			component: DesignerPage
		},
		{
			path: '/settings',
			name: 'settings',
			component: SettingsPage
		}
	]
});

export default router;
