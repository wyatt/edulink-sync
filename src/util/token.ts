import {env} from './env';
import {headers} from './fetch';
import {EdulinkResponse} from '../types/edulink/global';
import {Login} from '../types/edulink/login';
import fetch from 'node-fetch';

const credentials = {
	establishment_id: 2,
	username: env.username,
	password: env.password,
};

async function login() {
	const response: EdulinkResponse<Login> = await fetch(`https://${env.school}.edulinkone.com/api/`, {
		headers: {...headers, 'X-API-Method': `EduLink.Login`},
		method: 'POST',
		body: JSON.stringify({
			id: '1',
			jsonrpc: '2.0',
			method: 'EduLink.Login',
			params: credentials,
		}),
	}).then(res => res.json());
	if (!response.result.success) throw new Error(`❌ Login routine: ${response.result.error ?? 'Unknown error'}`);
	return {data: response.result.authtoken, expiry: response.result.session.expires};
}

export const token = login
