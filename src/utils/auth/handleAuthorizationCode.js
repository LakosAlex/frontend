import { AuthorizationApi } from 'src/api/authorizationApi';

const authorizationApi = AuthorizationApi();

export default function extractAuthorizationCodeFromUrl() {
	return async (to, from, next) => {
		if (isAuthorizationCodePresentInUrl(to)) {
			await handleAuthorizationCodeAndNavigateToPage(to, next);
		} else {
			next();
		}
	};
};

const isAuthorizationCodePresentInUrl = (url) => {
	return url.query.code;
};

const handleAuthorizationCodeAndNavigateToPage = async (url, next) => {
	await authorizationApi.handleAuthCode({
		code: url.query.code
	});
	next(url.path);
};
