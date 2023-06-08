import { PostgresClient } from 'src/libs/postgres';
import { RedisClient } from 'src/libs/redis';

export class HealthcheckService {
    private pg: PostgresClient;

    private redis: RedisClient;

    constructor(pg: PostgresClient, redis: RedisClient) {
        this.pg = pg;
        this.redis = redis;
    }

    async isDBReady(): Promise<boolean> {
        return this.pg.isConnected && this.redis.isConnected;
    }
}
