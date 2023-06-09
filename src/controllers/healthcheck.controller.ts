import { Request, Response, Router } from 'express';
import { HealthcheckService } from 'src/services/healthcheck.service';

export class HealthcheckController {
    private readonly healthcheckService: HealthcheckService;

    private router: Router;

    constructor(healthcheckService: HealthcheckService) {
        this.healthcheckService = healthcheckService;
        this.router = Router();
        this.router.get('/liveness', HealthcheckController.getHealthcheckLiveness);
        this.router.get('/readiness', this.getHealthcheckReadiness.bind(this));
    }

    getRouter(): Router {
        return this.router;
    }

    /**
     * GET /healthcheck/liveness
     * Check whether app is up
     */
    static async getHealthcheckLiveness(_: Request, res: Response): Promise<Response> {
        return res.status(200).json({ status: 'OK' });
    }

    /**
     * GET /healthcheck/readiness
     * Check whether app is ready to receive traffic
     */
    public async getHealthcheckReadiness(_: Request, res: Response): Promise<Response> {
        if (!(await this.healthcheckService.isDBReady())) {
            return res.status(503).json({
                status: 'Service Unavailable'
            });
        }
        return res.status(200).json({
            status: 'OK'
        });
    }
}
