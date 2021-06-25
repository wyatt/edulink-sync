import IORedis from 'ioredis';
import {env} from './env';

export const redis: IORedis.Redis = new IORedis(env.redisUrl, {
	lazyConnect: true,
});

export async function wrapRedis<T>(key: string, fn: () => Promise<{data: T; expiry?: number}>, seconds: number = 1800): Promise<T> {
	const cached = await redis.get(key);
	if (cached) return JSON.parse(cached);
	const {data, expiry} = await fn();

	if (!data) throw new Error('❌ Redis routine: Token not returned from redis wrappers');

	await redis.set(key, JSON.stringify(data), 'ex', expiry ?? seconds);

	return data;
}
