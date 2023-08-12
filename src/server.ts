import 'source-map-support/register';
import './module-alias';

import gracefulShutdown from 'http-graceful-shutdown';
import { createApp } from 'src/app';
import { logger } from 'src/libs/logger';

// Traefik, Trident's transport layer, has this default idle timeout in ms
const TRAEFIK_IDLE_TIMEOUT = 180;

/**
 * Sets up event listeners on unexpected errors and warnings. These should theoretically
 * never happen. If they do, we assume that the app is in a bad state. For errors, we
 * exit the process with code 1.
 */
const setupProcessEventListeners = () => {
    process.on('unhandledRejection', (reason: unknown) => {
        logger.warn({ reason_object: reason }, 'Encountered unhandled rejection');
        logger.info({ exit_code_number: 1 }, 'Exiting process');

        process.exit(1);
    });

    process.on('uncaughtException', (err: Error) => {
        logger.error(err, 'Encountered uncaught exception');
        logger.info({ exit_code_number: 1 }, 'Exiting process');

        process.exit(1);
    });

    process.on('warning', (warning: Error) => {
        logger.warn({ warning_object: warning }, 'Encountered warning');
    });
};

/**
 * Start an Express server and installs signal handlers on the
 * process for graceful shutdown.
 */
(async () => {
    try {
        // todo:: (refactor) Change this system to a class with all db's and with interface of connect and disconnect
        const { app, redisClient, postgresClient } = await createApp();
        const server = app.listen(app.get('port'), () => {
            logger.info(`Api server is running on http://${app.get('host')}:${app.get('port')}  `);
        });

        /**
         * These settings are to avoid 502 HTTP errors (connection reset by peer)
         */
        server.keepAliveTimeout = (TRAEFIK_IDLE_TIMEOUT + 1) * 1000;
        server.headersTimeout = (TRAEFIK_IDLE_TIMEOUT + 5) * 1000;

        gracefulShutdown(server, {
            onShutdown: async () => {
                await Promise.all([redisClient?.disconnect(), postgresClient?.disconnect()]);
            }
        });
        setupProcessEventListeners();
    } catch (err) {
        logger.error(err as Error, 'Error caught in server.ts');
    }
})();
