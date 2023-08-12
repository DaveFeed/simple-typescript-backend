import { NextFunction, Request, Response } from 'express';
import { Request as RequestJWT } from 'express-jwt';

import { Schemas } from 'src/libs/validation/schemas';

import { BaseController } from 'src/controllers/base.controller';

import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user';

import { DefaultResponse } from 'src/domain/dto/types';

export class UserController extends BaseController {
    protected userService: UserService;

    constructor(userService: UserService, authService: AuthService) {
        super();

        this.userService = userService;
        this.router.use(this.authenticationMiddleware(authService));

        this.router.get('/me', this.getMe.bind(this));
        this.router.get('/:id', this.validationCheck(Schemas.idFromParams), this.getUser.bind(this));
    }

    /**
     * GET /api/user/me
     *
     * @returns Auth user's ShortUserInfo
     */
    async getMe(req: RequestJWT, res: Response, next: NextFunction): DefaultResponse {
        try {
            const { userId } = req.auth;

            const data = await this.userService.getUser(userId);

            return res.status(200).json(data);
        } catch (e) {
            return next(e);
        }
    }

    /**
     * GET /api/user/:id
     *
     * @returns ShortUserInfo
     */
    async getUser(req: Request, res: Response, next: NextFunction): DefaultResponse {
        try {
            const { id } = req.params;

            const data = await this.userService.getUser(Number(id));

            return res.status(200).json(data);
        } catch (e) {
            return next(e);
        }
    }
}
