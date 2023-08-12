import { RedisRepository } from 'src/repositories/redis.repository';

import { StandardError } from 'src/domain/standard-error';
import { ErrorCodes } from 'src/domain/errors';

import { RedisPayload, ValidateAuthPayload } from 'src/domain/dto/types';

export class AuthService {
    private readonly redisRepository: RedisRepository;

    public constructor(redisRepository: RedisRepository) {
        this.redisRepository = redisRepository;
    }

    async validateAuth(payload: ValidateAuthPayload): Promise<void> {
        const token: string = await this.redisRepository.getAccessToken(payload.accessToken);

        if (!token) {
            throw new StandardError(ErrorCodes.EXPIRED_SESSION, 'This token is expired, try logging in again');
        }

        const redisPayload: RedisPayload = JSON.parse(token);

        await this.redisRepository.setAccessToken(payload.accessToken, redisPayload);
    }
}
