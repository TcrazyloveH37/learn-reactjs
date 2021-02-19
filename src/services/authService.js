import jwtDecode from 'jwt-decode';
import http from './httpService';

const apiEndpoint = '/auth';
const TOKEN_KEY = 'token';

http.setJwt(getJwt());

export async function login(email, password) {
	const { data: jwt } = await http.post(apiEndpoint, { email, password });

	localStorage.setItem(TOKEN_KEY, jwt);
}

export function loginWithJwt(jwt) {
	localStorage.setItem(TOKEN_KEY, jwt);
}

export function logout() {
	localStorage.removeItem(TOKEN_KEY);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(TOKEN_KEY);
		return jwtDecode(jwt);
	} catch (ex) {
		return null;
	}
}

export function getJwt() {
	return localStorage.getItem(TOKEN_KEY);
}

const auth = {
	login,
	loginWithJwt,
	logout,
	getCurrentUser,
	getJwt
};

export default auth;
