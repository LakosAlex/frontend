import { apiErrorResponseHandler } from './error/apiErrorResponseHandler.js';
import Axios from 'src/config/axiosConfig';

export function AuthorizationApi({ get, post, put, delete: httpDelete } = Axios()) {
	return {
		async getAuthConfig() {
			try {
				const { data } = await get('/api/v1/authorization/config', 
				);
				return data;
			} catch ({ response }) {
				apiErrorResponseHandler(response.status);
			}
		},

		async handleAuthCode({ code }) {
			await post('/api/v1/authorization/login', { code });
		},

		async getLoggedInUserInfo() {
			try {
				const { data } = await get('/api/v1/session/user');
				console.log(data);
				return data;
			} catch ({ response }) {
				apiErrorResponseHandler(response.status);
			}
		},

		async getLoggedInUserRoles() {
			try {
				const { data } = await get('/api/v1/session/user/roles');
				console.log(data);
				return data;
			} catch ({ response }) {
				apiErrorResponseHandler(response.status);
			}
		},
		
		async logout() {
			await get('/api/v1/authorization/logout');
		},
	};
}
