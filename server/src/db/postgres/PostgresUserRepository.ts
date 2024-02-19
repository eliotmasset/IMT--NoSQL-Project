import IUserRepository from '../interfaces/IUserRepository.ts';
import User from '../models/User.ts';
import PostgresDatabase from './PostgresDatabase.ts';

class PostgresUserRepository implements IUserRepository {
    private _database: PostgresDatabase;

    constructor(database: PostgresDatabase) {
        this._database = database;
    }

    public async create(
        id: number,
        email: string,
        username: string,
        password: string,
        creationDate: Date
    ): Promise<User> {
        console.log(this._database.sql``);
        return new User(id, email, username, password, creationDate);
    }

    public async find(id: number): Promise<User | null> {
        return null;
    }

    public async findByEmail(email: string): Promise<User | null> {
        return null;
    }
}

export default PostgresUserRepository;
