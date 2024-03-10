import StatDto from '../../controllers/StatDto';
import StatProductDto from '../../controllers/StatProductDto';
import IStatsRepository from '../interfaces/IStatsRepository';
import PostgresDatabase from './PostgresDatabase';

class PostgresStatsRepository implements IStatsRepository {
    private _db: PostgresDatabase;

    constructor() {
        this._db = PostgresDatabase.getInstance();
    }

    public async createIndex(): Promise<boolean> {
        try {
            await this._db
                .sql`CREATE INDEX follow_idx ON follow (follower, followed)`;
            return true;
        } catch (e) {
            return false;
        }
    }

    public async dropIndex(): Promise<boolean> {
        try {
            await this._db.sql`DROP INDEX follow_idx`;
            return true;
        } catch (e) {
            return false;
        }
    }

    public async getOrdersByUser(
        userId: number,
        depth: number
    ): Promise<StatDto> {
        const start = performance.now();
        const res = await this._db
            .sql`WITH RECURSIVE getfol(follower, followed, depth) AS (
            SELECT follower, followed, 1 FROM follow WHERE followed = ${userId}
        UNION ALL
            SELECT f.follower, f.followed, depth + 1 FROM follow f, getfol g WHERE f.followed = g.follower AND depth < ${depth}
        )
        SELECT p.id, p.name, COUNT(*) AS q FROM "order" o JOIN product p ON o.product = p.id WHERE "user" IN (SELECT DISTINCT follower FROM getfol) GROUP BY p.id, p.name`;
        const time = performance.now() - start;

        const orders = res.map(
            (order) => new StatProductDto(order.id, order.name, Number(order.q))
        );

        orders.sort((a, b) => {
            return a.productId - b.productId;
        });

        return new StatDto(time, orders);
    }

    public async getOrdersByUserAndProduct(
        userId: number,
        productId: number,
        depth: number
    ): Promise<StatDto> {
        const start = performance.now();
        const res = await this._db
            .sql`WITH RECURSIVE getfol(follower, followed, depth) AS (
            SELECT follower, followed, 1 FROM follow WHERE followed = ${userId}
        UNION ALL
            SELECT f.follower, f.followed, depth + 1 FROM follow f, getfol g WHERE f.followed = g.follower AND depth < ${depth}
        )
        SELECT p.id, p.name, COUNT(*) AS q FROM "order" o JOIN product p ON o.product = p.id WHERE o.product = ${productId} AND "user" IN (SELECT DISTINCT follower FROM getfol) GROUP BY p.id, p.name`;
        const time = performance.now() - start;

        const orders = res.map(
            (order) => new StatProductDto(order.id, order.name, Number(order.q))
        );

        return new StatDto(time, orders);
    }

    public async getUsersByProduct(
        productId: number,
        depth: number
    ): Promise<StatDto> {
        const start = performance.now();
        const res = await this._db
            .sql`WITH RECURSIVE getfol(follower, followed, depth) AS (
            SELECT follower, followed, 1 FROM follow WHERE followed IN (SELECT "user" FROM "order" WHERE product = ${productId})
        UNION ALL
            SELECT f.follower, f.followed, depth + 1 FROM follow f, getfol g WHERE f.followed = g.follower AND depth < ${depth}
        )
        SELECT p.id, p.name, COUNT(*) as q FROM "order" o JOIN product p ON o.product = p.id WHERE o.product = ${productId} AND "user" IN (SELECT DISTINCT follower FROM getfol) GROUP BY p.id, p.name`;
        const time = performance.now() - start;

        const orders = res.map(
            (order) => new StatProductDto(order.id, order.name, Number(order.q))
        );

        orders.sort((a, b) => {
            return a.productId - b.productId;
        });

        return new StatDto(time, orders);
    }
}

export default PostgresStatsRepository;
