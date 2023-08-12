import { Request, NextFunction, Response } from 'express';

import { logger } from 'src/libs/logger';

import { StandardError } from 'src/domain/standard-error';
import { ErrorCodes } from 'src/domain/errors';

import { Middleware } from 'src/domain/dto/types';

export const jwtErrorHandler = () => {
    // eslint-disable-next-line
    return (err: any, req: Request, res: Response, next: NextFunction): Middleware => {
        logger.info({ err }, 'caught jwt error');

        if (err.message === 'jwt expired') {
            throw new StandardError(ErrorCodes.EXPIRED_SESSION, 'This token is expired, try logging in again');
        }

        throw new StandardError(ErrorCodes.INVALID_TOKEN, 'Ensure you are using the correct token');
    };
};
