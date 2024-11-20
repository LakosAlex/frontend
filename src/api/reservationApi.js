import { apiErrorResponseHandler } from './error/apiErrorResponseHandler.js';
import Axios from 'src/config/axiosConfig';

export function ReservationApi({ get, post, put, delete: httpDelete } = Axios()) {
	return {
		async getReservations(date) {
			try {
				const { data } = await get('/api/v1/reservations/by-date/' + date);
				return data;
			} catch ({ response }) {
				apiErrorResponseHandler(response.status);
			}
		},

		async createReservation(reservationData) {
			try {
				await post('/api/v1/reservations', reservationData);
			} catch ({ response }) {
			  apiErrorResponseHandler(response.status);
			}
		},

		async getLoggedInUserReservations() {
			try {
				const { data } = await get('/api/v1/reservations/session/all');
				return data;
			} catch ({ response }) {
				apiErrorResponseHandler(response.status);
			}
		},

		async deleteReservation(requestId) {
			try {
				const { data } = await httpDelete('/api/v1/reservations/' + requestId);
				return data;
			} catch ({ response }) {
				apiErrorResponseHandler(response.status);
			}
		},
	};
}
