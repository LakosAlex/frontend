import { apiErrorResponseHandler } from './error/apiErrorResponseHandler.js';
import Axios from 'src/config/axiosConfig';

export function AssetApi({ get, post, put, delete: httpDelete } = Axios()) {
	return {
		async getRooms() {
			try {
				const { data } = await get('/api/v1/rooms');
				console.log(data);
				return data;
			} catch ({ response }) {
				apiErrorResponseHandler(response.status);
			}
		},
		
		async getWorkstations() {
			try {
				const { data } = await get('/api/v1/assets/workstation');
				console.log(data);
				return data;
			} catch ({ response }) {
				apiErrorResponseHandler(response.status);
			}
		},

	};
}
