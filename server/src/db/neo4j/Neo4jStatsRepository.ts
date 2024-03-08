import StatDto from '../../controllers/StatDto';
import StatOrderDto from '../../controllers/StatOrderDto';
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
                `MATCH (i:User{id:'${userId}'})<-[:FOLLOWS*0..${depth}]-(f:User)-[:ORDERED]->(p:Product) RETURN p.id, p.name, COUNT(*) as q`
            );

            const orders = res.records.map((record) => {
                return {
                    productId: record.get('p.id'),
                    productName: record.get('p.name'),
                    quantity: record.get('q').low,
                };
            });

            return new StatDto(performance.now() - start, orders);
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
        // MATCH (i:User{id:'2'})<-[:FOLLOWS*1..10]-(f:User)-[:ORDERED]->(p:Product{id:'8'}) RETURN p, COUNT(*);
        return new StatDto();
    }

    // Query 3
    public async getUsersByProduct(
        productId: number,
        depth: number
    ): Promise<StatDto> {
        return new StatDto();
    }
}

export default Neo4jStatsRepository;
