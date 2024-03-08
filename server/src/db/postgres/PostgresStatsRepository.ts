import StatDto from '../../controllers/StatDto';
import IStatsRepository from '../interfaces/IStatsRepository';
import PostgresDatabase from './PostgresDatabase';

class PostgresStatsRepository implements IStatsRepository {
    private _db: PostgresDatabase;

    constructor() {
        this._db = PostgresDatabase.getInstance();
    }

    public async getOrdersByUser(
        userId: number,
        depth: number
    ): Promise<StatDto> {
        return new StatDto();
    }

    public async getOrdersByUserAndProduct(
        userId: number,
        productId: number,
        depth: number
    ): Promise<StatDto> {
        return new StatDto();
    }

    public async getUsersByProduct(
        productId: number,
        depth: number
    ): Promise<StatDto> {
        return new StatDto();
    }
}

export default PostgresStatsRepository;
