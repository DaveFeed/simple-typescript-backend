import { Request, Response } from 'express';
import { Request as RequestJWT } from 'express-jwt';
import { BaseController } from 'src/controllers/base.controller';
import { UserService } from 'src/services/user.service';
import { DefaultResponse } from 'src/domain/dto/types';
import { AuthService } from 'src/services/auth.service';

export class UserController extends BaseController {
    protected userService: UserService;

    constructor(userService: UserService, authService: AuthService) {
        super();

        this.userService = userService;

        this.router.use(this.authenticationMiddleware(authService));
        this.router.get('/me', this.getMe.bind(this));
        this.router.get('/', this.validationCheck('idFromParams'), this.getUser.bind(this));
    }

    async getMe(req: RequestJWT, res: Response): DefaultResponse {
        const { id } = req.auth;

        const data = await this.userService.getUser(id);

        return res.status(200).json(data);
    }

    async getUser(req: Request, res: Response): DefaultResponse {
        const { id } = req.params;

        const data = await this.userService.getUser(id);

        return res.status(200).json(data);
    }
}
