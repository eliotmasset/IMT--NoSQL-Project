import { Request, Response, Router } from 'express';
import PostgresStatsRepository from '../db/postgres/PostgresStatsRepository';
import Neo4jStatsRepository from '../db/neo4j/Neo4jStatsRepository';

class StatsController {
    private _neo4jStatsRepository: Neo4jStatsRepository;
    private _postgresStatsRepository: PostgresStatsRepository;
    private _router: Router;

    constructor() {
        this._neo4jStatsRepository = new Neo4jStatsRepository();
        this._postgresStatsRepository = new PostgresStatsRepository();
        this._router = Router();

        this._router.get('/query1/:userId', this.getOrdersByUser.bind(this));
        this._router.get(
            '/query2/:userId/:productId',
            this.getOrdersByUserAndProduct.bind(this)
        );
        this._router.get(
            '/query3/:productId',
            this.getUsersByProduct.bind(this)
        );
    }

    public get router(): Router {
        return this._router;
    }

    public async getOrdersByUser(req: Request, res: Response) {
        let dbParam: string = 'postgres';
        let userIdParam: number | null = null;
        let depthParam: number = 0;

        // Get params
        if (
            typeof req.query.db == 'string' &&
            (req.query.db == 'postgres' || req.query.db == 'neo4j')
        ) {
            dbParam = req.query.db;
        } else if (req.query.db) {
            console.log(req.query.db);
            return res
                .status(400)
                .json({ status: 400, error: 'Invalid db param' });
        }

        if (!isNaN(Number(req.params.userId))) {
            userIdParam = Number(req.params.userId);
        } else {
            return res
                .status(400)
                .json({ status: 400, error: 'Invalid userId' });
        }

        if (!isNaN(Number(req.query.depth)) && Number(req.query.depth) >= 0) {
            depthParam = Number(req.query.depth);
        } else if (req.query.depth) {
            return res
                .status(400)
                .json({ status: 400, error: 'Invalid depth param' });
        }

        // Logic
        if (dbParam == 'postgres') {
            const stat = await this._postgresStatsRepository.getOrdersByUser(
                userIdParam,
                depthParam
            );
            res.json(stat);
        } else if (dbParam == 'neo4j') {
            const stat = await this._neo4jStatsRepository.getOrdersByUser(
                userIdParam,
                depthParam
            );
            res.json(stat);
        }
    }

    async getOrdersByUserAndProduct(req: Request, res: Response) {
        let dbParam: string = 'postgres';
        let userIdParam: number | null = null;
        let productIdParam: number | null = null;
        let depthParam: number = 0;

        // Get params
        if (
            typeof req.query.db == 'string' &&
            (req.query.db == 'postgres' || req.query.db == 'neo4j')
        ) {
            dbParam = req.query.db;
        } else if (req.query.db) {
            console.log(req.query.db);
            return res
                .status(400)
                .json({ status: 400, error: 'Invalid db param' });
        }

        if (!isNaN(Number(req.params.userId))) {
            userIdParam = Number(req.params.userId);
        } else {
            return res
                .status(400)
                .json({ status: 400, error: 'Invalid userId' });
        }

        if (!isNaN(Number(req.params.productId))) {
            productIdParam = Number(req.params.productId);
        } else {
            return res
                .status(400)
                .json({ status: 400, error: 'Invalid productId' });
        }

        if (!isNaN(Number(req.query.depth)) && Number(req.query.depth) >= 0) {
            depthParam = Number(req.query.depth);
        } else if (req.query.depth) {
            return res
                .status(400)
                .json({ status: 400, error: 'Invalid depth param' });
        }

        // Logic
        if (dbParam == 'postgres') {
            const stat =
                await this._postgresStatsRepository.getOrdersByUserAndProduct(
                    userIdParam,
                    productIdParam,
                    depthParam
                );
            res.json(stat);
        } else if (dbParam == 'neo4j') {
            const stat =
                await this._neo4jStatsRepository.getOrdersByUserAndProduct(
                    userIdParam,
                    productIdParam,
                    depthParam
                );
            res.json(stat);
        }
    }

    async getUsersByProduct(req: Request, res: Response) {
        let dbParam: string = 'postgres';
        let productIdParam: number | null = null;
        let depthParam: number = 0;

        // Get params
        if (
            typeof req.query.db == 'string' &&
            (req.query.db == 'postgres' || req.query.db == 'neo4j')
        ) {
            dbParam = req.query.db;
        } else if (req.query.db) {
            console.log(req.query.db);
            return res
                .status(400)
                .json({ status: 400, error: 'Invalid db param' });
        }

        if (!isNaN(Number(req.params.productId))) {
            productIdParam = Number(req.params.productId);
        } else {
            return res
                .status(400)
                .json({ status: 400, error: 'Invalid productId' });
        }

        if (!isNaN(Number(req.query.depth)) && Number(req.query.depth) >= 0) {
            depthParam = Number(req.query.depth);
        } else if (req.query.depth) {
            return res
                .status(400)
                .json({ status: 400, error: 'Invalid depth param' });
        }

        // Logic
        if (dbParam == 'postgres') {
            const stat = await this._postgresStatsRepository.getUsersByProduct(
                productIdParam,
                depthParam
            );
            res.json(stat);
        } else if (dbParam == 'neo4j') {
            const stat = await this._neo4jStatsRepository.getUsersByProduct(
                productIdParam,
                depthParam
            );
            res.json(stat);
        }
    }
}

export default StatsController;
