import { apiErrorResponseHandler } from './error/apiErrorResponseHandler.js';
import Axios from 'src/config/axiosConfig';

export function RequestApi({ get, post, put, delete: httpDelete } = Axios()) {
	return {
		async createRequest(request) {
			try {
				const { data } = await post('/api/v1/requests', request);
				return data;
			} catch ({ response }) {
				apiErrorResponseHandler(response.status);
				return response.data;
			}
		},

        async getRequests() {
			try {
				const { data } = await get('/api/v1/requests/session/all');
				return data;
			} catch ({ response }) {
				apiErrorResponseHandler(response.status);
			}
		},

		async getAllRequests() {
			try {
				const { data } = await get('/api/v1/requests/manage/getAll');
				console.log(data);
				return data;
			} catch ({ response }) {
				apiErrorResponseHandler(response.status);
			}
		},

		async deleteRequest(requestId) {
			try {
				const { data } = await httpDelete('/api/v1/requests/' + requestId);
				return data;
			} catch ({ response }) {
				apiErrorResponseHandler(response.status);
			}
		},

		async acceptRequest(requestId) {
			try {
				const { data } = await put('/api/v1/requests/manage/accept/' + requestId);
				return data;
			} catch ({ response }) {
				apiErrorResponseHandler(response.status);
			}
		},

		async rejectRequest(requestId) {
			try {
				const { data } = await put('/api/v1/requests/manage/reject/' + requestId);
				return data;
			} catch ({ response }) {
				apiErrorResponseHandler(response.status);
			}
		},
	};
}
