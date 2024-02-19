import IDatabase from '../interfaces/IDatabase.ts';
import IProductRepository from '../interfaces/IProductRepository.ts';
import IUserRepository from '../interfaces/IUserRepository.ts';
import User from '../models/User.ts';
import Product from '../models/Product.ts';
import PostgresUserRepository from './PostgresUserRepository.ts';
import PostgresProductRepository from './PostgresProductRepository.ts';

class PostgresDatabase implements IDatabase {
    private static instance: PostgresDatabase | null = null;
    private repositories: Map<string, any>;

    private constructor() {
        this.repositories = new Map();

        this.repositories.set(User.name, new PostgresUserRepository());
        this.repositories.set(Product.name, new PostgresProductRepository());
    }

    public static getInstance(): PostgresDatabase {
        if (this.instance === null) {
            this.instance = new this();
        }

        return this.instance;
    }

    public getRepository(
        classname: string
    ): IUserRepository | IProductRepository {
        if (this.repositories.has(classname)) {
            return this.repositories.get(classname);
        }

        throw new Error('Specified classname does not exists.');
    }
}

export default PostgresDatabase;
