import { RedisRepository } from 'src/repositories/redis.repository';
import { PostgresClient } from 'src/libs/postgres';

export class BaseRepository {
    protected db: PostgresClient;

    protected redis?: RedisRepository;

    constructor(db: PostgresClient, redis?: RedisRepository) {
        this.db = db;
        this.redis = redis;
    }
}
