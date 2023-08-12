import { Request, Response } from 'express';

import { BaseController } from 'src/controllers/base.controller';

export class RootController extends BaseController {
    constructor() {
        super();

        this.router.get('/', RootController.index);
    }

    /**
     * GET /
     * Home
     */
    static index(_: Request, res: Response): Response {
        return res.status(200).json({ message: 'You have successfully started the service!' });
    }
}
