import StatDto from '../../controllers/StatDto';
import StatProductDto from '../../controllers/StatProductDto';
import IStatsRepository from '../interfaces/IStatsRepository';
import Neo4jDatabase from './Neo4jDatabase';

class Neo4jStatsRepository implements IStatsRepository {
    private _db: Neo4jDatabase;

    constructor() {
        this._db = Neo4jDatabase.getInstance();
    }

    // Query 1
    public async getOrdersByUser(
        userId: number,
        depth: number
    ): Promise<StatDto> {
        const session = this._db.db.session();

        try {
            const start = performance.now();
            const res = await session.run(
                `MATCH (i:User{id:'${userId}'})<-[:FOLLOWS*1..${depth}]-(f:User)-[:ORDERED]->(p:Product) RETURN p.id, p.name, COUNT(DISTINCT f) as q`
            );
            const time = performance.now() - start;

            const orders = res.records.map(
                (record) =>
                    new StatProductDto(
                        Number(record.get('p.id')),
                        record.get('p.name'),
                        record.get('q').low
                    )
            );

            orders.sort((a, b) => {
                return a.productId - b.productId;
            });

            return new StatDto(time, orders);
        } finally {
            session.close();
        }

        return new StatDto();
    }

    // Query 2
    public async getOrdersByUserAndProduct(
        userId: number,
        productId: number,
        depth: number
    ): Promise<StatDto> {
        const session = this._db.db.session();

        try {
            const start = performance.now();
            const res = await session.run(
                `MATCH (i:User{id:'${userId}'})<-[:FOLLOWS*1..${depth}]-(f:User)-[:ORDERED]->(p:Product{id:'${productId}'}) RETURN p.id, p.name, COUNT(DISTINCT f) as q`
            );
            const time = performance.now() - start;

            const orders = res.records.map(
                (record) =>
                    new StatProductDto(
                        Number(record.get('p.id')),
                        record.get('p.name'),
                        record.get('q').low
                    )
            );

            return new StatDto(time, orders);
        } finally {
            session.close();
        }

        return new StatDto();
    }

    // Query 3
    public async getUsersByProduct(
        productId: number,
        depth: number
    ): Promise<StatDto> {
        const session = this._db.db.session();

        try {
            const start = performance.now();
            const res = await session.run(
                `MATCH (m:Product{id:'${productId}'})<-[:ORDERED]-(u:User)<-[:FOLLOWS*0..${depth}]-(f:User)-[:ORDERED]->(p:Product{id:'${productId}'}) RETURN p.id, p.name, COUNT(DISTINCT f) as q`
            );
            const time = performance.now() - start;

            const orders = res.records.map(
                (record) =>
                    new StatProductDto(
                        Number(record.get('p.id')),
                        record.get('p.name'),
                        record.get('q').low
                    )
            );

            orders.sort((a, b) => {
                return a.productId - b.productId;
            });

            return new StatDto(time, orders);
        } finally {
            session.close();
        }

        return new StatDto();
    }
}

export default Neo4jStatsRepository;
