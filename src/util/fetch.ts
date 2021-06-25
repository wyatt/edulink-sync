import {env} from './env';
import {token} from './token';
import {EdulinkEndpoint} from '../types/global';
import {EdulinkResponse, PositiveResponseDefaults} from '../types/edulink/global';
import fetch, {Headers} from 'node-fetch';

export const headers = {
	'accept': 'application/json, text/plain, */*',
	'accept-language': 'en-US,en;q=0.9',
	'content-type': 'application/json;charset=UTF-8',
	'sec-fetch-dest': 'empty',
	'sec-fetch-mode': 'cors',
	'sec-fetch-site': 'same-origin',
};

export const edulinkFetch = async <T extends PositiveResponseDefaults>(endpoint: EdulinkEndpoint, params: Record<string, any>) => {
	const response: EdulinkResponse<T> = await fetch(`https://${env.school}.edulinkone.com/api/`, {
		headers: {...headers, 'Authorization': `Bearer ${await token}`, 'X-API-Method': `EduLink.${endpoint}`},
		method: 'POST',
		body: JSON.stringify({
			jsonrpc: '2.0',
			method: `EduLink.${endpoint}`,
			params,
		}),
	}).then(res => res.json());

	if (!response.result.success) throw new Error(`❌ ${endpoint} routine: ${response.result.error ?? 'Unknown error'}`);
	return {data: response.result};
};
