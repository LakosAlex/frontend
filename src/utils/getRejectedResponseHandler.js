export default function getRejectedResponseHandler({ get, request }) {
	const handleAuthRedirect = async () => {
		window.location.href = (await get(
			'/api/v1/authorization/config')).data.redirectURL;
	};

	return async (error) => {
		if (error.response.status === 401) {
			await handleAuthRedirect();
		}
		if (error.response.status === 449) {
			return request(error.config);
		}
		return Promise.reject(error);
	};
}
