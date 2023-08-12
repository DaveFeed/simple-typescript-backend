export const ErrorCodes = {
    NO_ACCESS: {
        code: 'NO_ACCESS',
        status: 400,
        defaultMessage: 'You do not have the rights to access this service'
    },
    EXPIRED_SESSION: {
        code: 'EXPIRED_SESSION',
        status: 401,
        defaultMessage: 'This session is expired'
    },
    INVALID_TOKEN: {
        code: 'INVALID_TOKEN',
        status: 401,
        defaultMessage: 'Invalid token'
    },
    USER_NOT_FOUND: {
        code: 'USER_NOT_FOUND',
        status: 400,
        defaultMessage: 'User was not found'
    },
    ALREADY_EXISTS: {
        code: 'ALREADY_EXISTS',
        status: 409,
        defaultMessage: 'This already exists'
    },
    DOES_NOT_EXIST: {
        code: 'DOES_NOT_EXIST',
        status: 409,
        defaultMessage: 'This does not exist'
    }
};
