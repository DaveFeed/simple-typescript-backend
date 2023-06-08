import express, { Application, RequestHandler } from 'express';
import httpContext from 'express-http-context';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';

import { PORT, HOST } from 'src/config';
import { errorHandler } from 'src/middlewares/error-handler.middleware';

import { init } from 'src/init';
import { logger, createMiddleware } from 'src/libs/logger';
import { PostgresClient } from 'src/libs/postgres';
import { RedisClient } from 'src/libs/redis';

/**
 * Setup the application routes with controllers
 * @param app
 */
async function setupRoutes(app: Application) {
    const { postgresClient, redisClient, rootController, healthcheckController, userController } = await init();

    app.use('/', rootController.getRouter());
    app.use('/healthcheck', healthcheckController.getRouter());
    app.use('/api/user', userController.getRouter());

    return { postgresClient, redisClient };
}

export interface AppContainer {
    app: express.Application;

    postgresClient: PostgresClient;
    redisClient: RedisClient;
}

/**
 * Main function to setup Express application here
 */
export async function createApp(): Promise<AppContainer> {
    const app = express();
    app.set('port', PORT);
    app.set('host', HOST);
    app.use(cors({ origin: '*' }));
    // app.use(express.static('public'));
    // app.use('/files', express.static('uploads/files'));
    app.use(compression());
    app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }) as RequestHandler);
    app.use(bodyParser.urlencoded({ extended: true }) as RequestHandler);
    app.use(createMiddleware(logger) as RequestHandler); // Needs to be after bodyParser

    // This should be last, right before routes are installed
    // so we can have access to context of all previously installed
    // middlewares inside our routes to be logged
    app.use(httpContext.middleware);

    const { postgresClient, redisClient } = await setupRoutes(app);

    // In order for errors from async controller methods to be thrown here,
    // you need to catch the errors in the controller and use `next(err)`.
    // See https://expressjs.com/en/guide/error-handling.html
    app.use(errorHandler());

    return {
        app,
        redisClient,
        postgresClient
    };
}
