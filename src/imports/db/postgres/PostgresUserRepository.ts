import IUserRepository from '../interfaces/IUserRepository.ts';
import User from '../models/User.ts';

class PostgresUserRepository implements IUserRepository {
    public create(
        id: number,
        email: string,
        username: string,
        password: string,
        creationDate: Date
    ): User {
        return new User(id, email, username, password, creationDate);
    }

    public find(id: number): User | null {
        return null;
    }

    public findByEmail(email: string): User | null {
        return null;
    }
}

export default PostgresUserRepository;
