import { apiErrorResponseHandler } from './error/apiErrorResponseHandler.js';
import Axios from 'src/config/axiosConfig';

export function UserApi({ get, post, put, delete: httpDelete } = Axios()) {
	return {
		async getLoggedInUserProfilePicture() {
			try {
				const { data } = await get('/api/v1/user/profile_picture');
				console.log(data);
				return data;
			} catch ({ response }) {
				apiErrorResponseHandler(response.status);
			}
		},

		async getUserProfilePictureByEmail(email) {
			try {
				const { data } = await get('/api/v1/user/profile_picture_by_email', {
					params: { email: email },
				});
				console.log(data);
				return data;
			} catch ({ response }) {
				apiErrorResponseHandler(response.status);
			}
		},

		async uploadProfilePicture(pfp) {
			try {
				const formData = new FormData();
				formData.append('img', pfp);

				const response = await post('/api/v1/user/profile_picture', formData);

				return response;
			} catch (error) {
				return response;
			}
		},

		async getUserByUserId(userId) {
			try {
				const { data } = await get('/api/v1/user/byId/' + userId);
				return data;
			} catch (error) {
				return response;
			}
		},

		async createUserProfile(userProfileObject) {
			try {
				const response = await post('/api/v1/admin/users', userProfileObject);
				return response;
			} catch (error) {
				return response;
			}
		}
	}
}
