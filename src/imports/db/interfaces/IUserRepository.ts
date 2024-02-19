import User from '../models/User.ts';

interface IUserRepository {
    create(
        id: number,
        email: string,
        username: string,
        password: string,
        creationDate: Date
    ): User;

    find(id: number): User | null;

    findByEmail(email: string): User | null;
}

export default IUserRepository;
