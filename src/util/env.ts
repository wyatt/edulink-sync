import {config} from 'dotenv';

config();

function validateEnv<T extends string = string>(key: keyof NodeJS.ProcessEnv, defaultValue?: T): T {
	const value = process.env[key] as T | undefined;

	if (!value) {
		if (typeof defaultValue !== 'undefined') {
			return defaultValue;
		}

		throw new Error(`${key} is not defined in environment variables`);
	}

	return value;
}

export const env = {
	school: validateEnv('SCHOOL_SUBDOMAIN'),
	redisUrl: validateEnv('REDIS_URL', 'redis://127.0.0.1:56379'),
	username: validateEnv('EDULINK_USERNAME'),
	password: validateEnv('EDULINK_PASSWORD'),
	calendarId: validateEnv('CALENDAR_ID'),
} as const;
