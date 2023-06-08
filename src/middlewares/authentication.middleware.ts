import { expressjwt as jwt } from 'express-jwt';
import { AuthService } from 'src/services/auth.service';
import { validateAuthMiddleware } from 'src/middlewares/validate-auth.middleware';
import { jwtErrorHandler } from 'src/middlewares/jwt.middleware';
import { ACCESS_TOKEN_SECRET, JWT_ALGORITHM } from 'src/config';
import { Algorithm } from 'jsonwebtoken';

const validateExpressJwt = (secret: string = ACCESS_TOKEN_SECRET) => {
    const data = jwt({
        secret,
        algorithms: [JWT_ALGORITHM as Algorithm]
    });

    return data;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const authenticationMiddleware = (authService: AuthService) => {
    return [validateExpressJwt(), jwtErrorHandler(), validateAuthMiddleware(authService)];
};
