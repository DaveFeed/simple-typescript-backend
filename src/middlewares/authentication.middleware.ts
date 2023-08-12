import { expressjwt as jwt } from 'express-jwt';
import { Algorithm, Secret } from 'jsonwebtoken';

import { AuthService } from 'src/services/auth.service';

import { validateAuthMiddleware } from 'src/middlewares/validate-auth.middleware';
import { jwtErrorHandler } from 'src/middlewares/jwt.middleware';

import { ACCESS_TOKEN_SECRET, JWT_ALGORITHM } from 'src/config';

const validateExpressJwt = (secret = ACCESS_TOKEN_SECRET) => {
    const data = jwt({
        secret: secret as Secret,
        algorithms: [JWT_ALGORITHM as Algorithm]
    });

    return data;
};

/**
 * Creates an middleware which checks the token,
 * handles the possible errors from token check and then validates authentication
 *
 * @param authService Authentication Service to request data from db's
 * @returns Middleware
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const authenticationMiddleware = (authService: AuthService) => {
    return [validateExpressJwt(), jwtErrorHandler(), validateAuthMiddleware(authService)];
};
