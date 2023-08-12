import { Request as RequestJWT } from 'express-jwt';
import { NextFunction, Response } from 'express';
import { ObjectSchema } from 'joi';

export interface RedisPayload {
    id: string;
    email: string;
    admin: boolean;
}

export interface ValidateAuthPayload {
    id: number;
    accessToken: string;
}

export type DefaultResponse = Promise<void | Response<unknown, Record<string, unknown>>>;

export interface Schema {
    [key: string]: ObjectSchema<unknown>;
}

export interface Middleware {
    <T>(req: RequestJWT & T, res: Response, next: NextFunction): void;
}
