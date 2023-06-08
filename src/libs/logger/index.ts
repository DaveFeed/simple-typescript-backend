import { IS_TEST, IS_PRODUCTION } from 'src/config';
import { createLogger, createMiddleware as middleware } from './logger';

export const logger = createLogger({
    options: {
        level: IS_TEST ? 'silent' : 'info',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: !IS_PRODUCTION,
                customColors: 'err:red,info:green',
                levelFirst: true,
                append: IS_PRODUCTION, // the file is opened with the 'a' flag
                mkdir: IS_PRODUCTION, // create the target destination
                translateTime: 'UTC:yyyy-mm-dd HH:MM:ss.l ',
                destination: !IS_PRODUCTION ? 1 : 'logs.txt'
            }
        }
    }
});
export const createMiddleware = middleware;
