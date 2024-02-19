import User from '../models/User.ts';

interface IUserRepository {
    create(
        id: number,
        email: string,
        username: string,
        password: string,
        creationDate: Date
    ): Promise<User>;

    find(id: number): Promise<User | null>;

    findByEmail(email: string): Promise<User | null>;
}

export default IUserRepository;
