import User from '../models/User.ts';

interface IUserDao {
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

export default IUserDao;
