import { RedisClient } from 'src/libs/redis';

import { TokenTypesEnum } from 'src/domain/enums';
import { ONE_DAY } from 'src/domain/constants';

import { RedisPayload } from 'src/domain/dto/types';

export class RedisRepository {
    private readonly redis: RedisClient;

    constructor(redis: RedisClient) {
        this.redis = redis;
    }

    public async getAccessToken(token: string): Promise<string> {
        return this.redis.get(`${TokenTypesEnum.ACCESS_TOKEN}:${token}`);
    }

    public async setAccessToken(token: string, payload: RedisPayload): Promise<string> {
        return this.redis.set(`${TokenTypesEnum.ACCESS_TOKEN}:${token}`, JSON.stringify(payload), ONE_DAY);
    }

    public async deleteTokenFromRedis(type: TokenTypesEnum, token: string): Promise<number> {
        return this.redis.delete(`${type}:${token}`);
    }
}
