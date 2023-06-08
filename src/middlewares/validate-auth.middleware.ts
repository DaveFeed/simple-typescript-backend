import { NextFunction, Response } from 'express';
import { Request as RequestJWT } from 'express-jwt';
import { AuthService } from 'src/services/auth.service';
import { Middleware } from 'src/middlewares/types';

export const validateAuthMiddleware = (authService: AuthService): Middleware => {
    return async (req: RequestJWT, res: Response, next: NextFunction) => {
        try {
            await authService.validateAuth({
                id: req.auth.userId,
                accessToken: req.headers.authorization.split(' ')[1]
            });

            return next();
        } catch (error) {
            return next(error);
        }
    };
};
