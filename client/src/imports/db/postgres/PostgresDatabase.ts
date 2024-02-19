import IDatabase from '../interfaces/IDatabase.ts';
import IProductRepository from '../interfaces/IProductRepository.ts';
import IUserRepository from '../interfaces/IUserRepository.ts';
import User from '../models/User.ts';
import Product from '../models/Product.ts';
import PostgresUserRepository from './PostgresUserRepository.ts';
import PostgresProductRepository from './PostgresProductRepository.ts';

class PostgresDatabase implements IDatabase {
    private static _instance: PostgresDatabase | null = null;
    private _repositories: Map<string, any>;
    private _sql: Connection;

    private constructor() {
        this._repositories = new Map();

        this._repositories.set(User.name, new PostgresUserRepository(this));
        this._repositories.set(
            Product.name,
            new PostgresProductRepository(this)
        );

        this._sql = new Connection();
    }

    public static getInstance(): PostgresDatabase {
        if (this._instance === null) {
            this._instance = new this();
        }

        return this._instance;
    }

    public getRepository(
        classname: string
    ): IUserRepository | IProductRepository {
        if (this._repositories.has(classname)) {
            return this._repositories.get(classname);
        }

        throw new Error('Specified classname does not exists.');
    }

    public get sql(): Connection {
        return this._sql;
    }
}

export default PostgresDatabase;
