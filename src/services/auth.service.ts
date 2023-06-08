import { UserRepository } from 'src/repositories/user-repository';
import { RedisRepository } from 'src/repositories/redis-repository';
import { StandardError } from 'src/domain/standard-error';
import { ErrorCodes } from 'src/domain/errors';
import { RedisPayload, ValidateAuthPayload } from 'src/domain/dto/types';

export class AuthService {
    private readonly userRepository: UserRepository;

    private readonly redisRepository: RedisRepository;

    // todo:: (refactor) move this from here to enum maybe?
    private readonly allowedRoles = ['admin', 'director'];

    public constructor(userRepository: UserRepository, redisRepository: RedisRepository) {
        this.userRepository = userRepository;
        this.redisRepository = redisRepository;
    }

    async validateAuth(payload: ValidateAuthPayload): Promise<void> {
        const user = await this.userRepository.findById(payload.id);

        if (!this.allowedRoles.includes(user.role)) {
            throw new StandardError(ErrorCodes.NO_ACCESS, 'You do not have the rights to access this service');
        }

        const token: string = await this.redisRepository.getAccessToken(payload.accessToken);
        if (!token) {
            throw new StandardError(ErrorCodes.EXPIRED_SESSION, 'This token is expired, try logging in again');
        }

        const redisPayload: RedisPayload = JSON.parse(token);

        await this.redisRepository.setAccessToken(payload.accessToken, redisPayload);
    }
}
