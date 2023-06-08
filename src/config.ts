// NOTE: All env vars from process.env are imported as STRINGS. It is important to keep this in mind and cast your env vars as needed.

export const { NODE_ENV, VERSION, PASSWORD_SALT } = process.env;

export const { SERVICE_NAME } = process.env;
export const { PORT, HOST } = process.env;

export const IS_PRODUCTION = NODE_ENV === 'production';
export const IS_LOCAL = NODE_ENV === 'local';
export const IS_TEST = NODE_ENV === 'test';

// DATABASE
export const { PG_DATABASE } = process.env;
export const { PG_HOST } = process.env;
export const PG_PORT = Number(process.env.PG_PORT);
export const { PG_USER } = process.env;
export const { PG_PASSWORD } = process.env;

// REDIS
export const { REDIS_URL } = process.env;

// Envvars for auth
export const JWT_ALGORITHM = process.env.JWT_ALGORITHM || 'HS256';
export const { ACCESS_TOKEN_SECRET } = process.env;
