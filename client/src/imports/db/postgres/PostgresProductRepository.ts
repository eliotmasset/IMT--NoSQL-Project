import IProductRepository from '../interfaces/IProductRepository.ts';
import Product from '../models/Product.ts';
import PostgresDatabase from './PostgresDatabase.ts';

class PostgresProductRepository implements IProductRepository {
    private _database: PostgresDatabase;

    constructor(database: PostgresDatabase) {
        this._database = database;
    }

    public find(id: number): Product | null {
        return null;
    }
}

export default PostgresProductRepository;
