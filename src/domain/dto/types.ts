import { Response } from 'express';

export interface RedisPayload {
    id: string;
    email: string;
    admin: boolean;
}

export interface ValidateAuthPayload {
    id: string;
    accessToken: string;
}

export type DefaultResponse = Promise<Response<any, Record<string, any>>>;
