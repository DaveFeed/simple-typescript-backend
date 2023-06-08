import { Client } from 'pg';
import { RedisRepository } from './redis-repository';

export class BaseRepository {
    protected db: Client;

    protected redis: RedisRepository;

    constructor(db: Client, redis?: RedisRepository) {
        this.db = db;
        this.redis = redis;
    }
}
