import Redis, { RedisKey, RedisOptions } from 'ioredis';

import { logger } from 'src/libs/logger';

import { REDIS_URL } from 'src/config';

export class RedisClient {
    private readonly redis: Redis;

    private readonly redisConfig: RedisOptions = {};

    public isConnected: boolean;

    constructor() {
        this.isConnected = false;
        this.redis = new Redis(REDIS_URL as string, this.redisConfig);

        this.redis.on('connect', () => {
            logger.info('Connected to Redis.');
            this.isConnected = true;
        });

        this.redis.on('error', (err) => {
            logger.error(err, 'Redis error');
        });
    }

    public async disconnect(): Promise<boolean> {
        if ((await this.redis.quit()) === 'OK') {
            this.isConnected = false;
            logger.info('Disconnected from Redis.');
            return true;
        }
        return false;
    }

    public get(key: string): Promise<string | null> {
        return this.redis.get(key);
    }

    public delete(key: string): Promise<number> {
        return this.redis.del(key);
    }

    public set(key: string, value: string, seconds?: number): Promise<string> {
        return this.redis.set(key as RedisKey, value, 'EX', seconds);
    }
}
