export const apiErrorResponseHandler = (status) => {
	if (!isUserLoggedIn(status)) {
		throw new Error("User is not logged in");
	}
}

const isUserLoggedIn = (status) => {
    return status !== 401;
}