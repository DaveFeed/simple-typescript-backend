import { Router } from 'express';
import { validationCheck } from 'src/libs/validation';
import { authenticationMiddleware } from 'src/middlewares/authentication.middleware';

export class BaseController {
    protected router: Router;

    protected validationCheck = validationCheck;

    protected authenticationMiddleware = authenticationMiddleware;

    constructor() {
        this.router = Router();
    }

    getRouter(): Router {
        return this.router;
    }
}
