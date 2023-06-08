import { Request, NextFunction, Response } from 'express';
import { logger } from 'src/libs/logger';
import { ErrorCodes } from 'src/domain/errors';
import { ValidationError } from 'express-validation';

export const errorHandler = () => {
    // This is an express error handler, need to the 4 variable signature
    // eslint-disable-next-line
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        if ((err as ValidationError).statusCode) {
            logger.info({ err }, 'Validation Error');
            return res.status(err.statusCode).json({
                message: err.message,
                error_code: err.error_code || ErrorCodes.API_VALIDATION_ERROR,
                // only exposed Sample-API-standard compliant fields //
                errors: err.details
                    ? // todo:: (fix) This part is not working and is outdated, needs to be changed
                      err.details.map((e: { path: string; message: string; doc_url?: string }) => ({
                          path: e.path,
                          message: e.message,
                          doc_url: e.doc_url
                      }))
                    : err.details
            });
        }

        const statusCode = Number(ErrorCodes[err.error_code as keyof typeof ErrorCodes]?.code);

        if (!Number.isNaN(statusCode)) {
            const logContext = {
                error_code: err.error_code,
                status_code: statusCode,
                context: err.context
            };

            logger.info(logContext, 'API error');

            return res.status(statusCode).send({
                message: err.message,
                error_code: err.error_code
            });
        }

        logger.error(err, 'unexpected error');

        return res.status(500).send({
            error_code: 'SERVER_ERROR',
            message: 'Something unexpected happened, we are investigating this issue right now'
        });
    };
};
