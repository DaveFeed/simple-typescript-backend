import { PostgresClient } from 'src/libs/postgres';
import { RedisClient } from 'src/libs/redis';

// CONTROLLERS
import { RootController } from 'src/controllers/root.controller';
import { HealthcheckController } from 'src/controllers/healthcheck.controller';
import { UserController } from 'src/controllers/user.controller';

// SERVICES
import { HealthcheckService } from 'src/services/healthcheck.service';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

// REPOSITORIES
import { RedisRepository } from 'src/repositories/redis-repository';
import { UserRepository } from 'src/repositories/user-repository';

export interface InitContainer {
    postgresClient: PostgresClient;
    redisClient: RedisClient;

    rootController: RootController;
    healthcheckController: HealthcheckController;
    userController: UserController;
}

/**
 * Initialize all ENV values and dependencies here so that they are re-usable across web servers, queue runners and crons
 */
export async function init(): Promise<InitContainer> {
    // Database clients
    const redisClient = new RedisClient();
    const pgClient = new PostgresClient();

    // REPOSITORIES
    const redisRepository = new RedisRepository(redisClient);
    const userRepository = new UserRepository(pgClient.client);

    // SERVICES
    const healthcheckService = new HealthcheckService(pgClient, redisClient);
    const authService = new AuthService(userRepository, redisRepository);
    const userService = new UserService(userRepository);

    // CONTROLLERS
    const rootController = new RootController();
    const healthcheckController = new HealthcheckController(healthcheckService);
    const userController = new UserController(userService, authService);

    return {
        postgresClient: pgClient,
        redisClient,

        rootController,
        healthcheckController,
        userController
    };
}
