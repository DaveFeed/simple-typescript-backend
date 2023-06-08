import { Request as RequestJWT } from 'express-jwt';
import { NextFunction, Response } from 'express';

export interface Middleware {
    <T>(req: RequestJWT & T, res: Response, next: NextFunction): void;
}
