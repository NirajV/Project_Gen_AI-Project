import axios from 'axios';
import config from './config';

function resolve(options){
	let headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest'
	};
	
	let user = localStorage.getItem('user') || null;
	user = typeof user === 'string' && JSON.parse(user);
	if (user !== null && user !== false && user.token !== null){
		headers['X-AUTH-TOKEN'] = user.token;
	}
	if (typeof options === 'object' && options.hasOwnProperty('headers')) {
		headers = Object.assign(headers, options.headers);
	}
	const _client = axios.create({
		baseURL: config.appBaseUrl,
		headers
	});
	_client.interceptors.response.use((response) => {
		const latestToken = response.data.latestToken;
		if (latestToken && typeof latestToken === 'string' && window.location.pathname === '/') {
			const user = { token: latestToken }
			localStorage.setItem('user', JSON.stringify(user));
		}
		return response;
	},(error) => {
		if (error.response.status === 401) {
			window.location.href = '/login';
			localStorage.removeItem('user');
		}
		return Promise.reject(error);
	});

	return _client;
}

export default resolve;