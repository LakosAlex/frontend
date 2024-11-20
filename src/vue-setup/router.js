import { createRouter, createWebHistory} from 'vue-router';
import handleAuthorizationCode from 'src/utils/auth/handleAuthorizationCode'


const routes = [
	{
		name: '/', path: '/',
		props: ({ query }) => query,
		component: () => import('../view/Shell.vue'),
		children: [
			{
				path: 'profile',
				name: 'profile',
				component: () => import('../view/Profile.vue'),
			},
			{
				path: 'language_selector',
				name: 'language_selector',
				component: () => import('../view/LanguageSelector.vue'),
			},
			{
				path: 'reservations',
				name: 'reservations',
				component: () => import('../view/Reservations.vue'),
			},
			{
				path: 'office_attendance',
				name: 'office_attendance',
				component: () => import('../view/OfficeAttendance.vue'),
			},
			{
				path: 'user_requests',
				name: 'user_requests',
				component: () => import('../view/Requests.vue'),
			},
			{
				path: 'my_reservations',
				name: 'my_reservations',
				component: () => import('../view/MyReservations.vue'),
			},
			{
				path: 'manage_requests',
				name: 'manage_requests',
				component: () => import('../view/ManageRequests.vue'),
			},
			{
				path: 'user_profile_management',
				name: 'user_profile_management',
				component: () => import('../view/UserProfileManagement.vue'),
			}
		]
	},
];

export const router = createRouter({
	routes,
	history: createWebHistory(process.env.PUBLIC_PATH),
});

router.beforeEach(handleAuthorizationCode());
