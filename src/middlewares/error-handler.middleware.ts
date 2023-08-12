import { Request, NextFunction, Response } from 'express';

import { logger } from 'src/libs/logger';

export const errorHandler = () => {
    // eslint-disable-next-line
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        if (err?.name === 'ValidationError') {
            const logInfo = {
                message: err.message,
                statusCode: err.statusCode,
                errorName: 'API_VALIDATION_ERROR',
                details: err.details
            };

            logger.info(logInfo, 'Validation Error');

            return res.status(err.statusCode).json(logInfo);
        }

        if (err.statusCode && !Number.isNaN(err.statusCode)) {
            const logContext = {
                message: err.message,
                errorName: err.errorCode,
                statusCode: err.statusCode,
                lastError: err.lastError,
                context: err.context
            };

            logger.info(logContext, 'API Error');

            return res.status(err.statusCode || 400).send({
                message: err.message,
                errorName: err.errorCode,
                statusCode: err.statusCode
            });
        }

        logger.error(err, 'Unexpected Error!');

        return res.status(500).send({
            error_code: 'SERVER_ERROR',
            message: 'Something unexpected happened, we are investigating this issue right now'
        });
    };
};
