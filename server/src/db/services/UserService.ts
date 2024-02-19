import IDatabase from '../interfaces/IDatabase';
import IFollowerRepository from '../interfaces/IFollowerRepository';
import IUserRepository from '../interfaces/IUserRepository';
import Follower from '../models/Follower';
import User from '../models/User';

class UserService {

    max_followers = 20;

    db: IDatabase;

    constructor(db: IDatabase) {
        this.db = db;
    }

    async insertRandomUsers(nb_users: number): Promise<void> {
        const generator = new RandomGenerator('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
        let userRepository = this.db.getRepository(User.name) as IUserRepository;
        let followerRepository = this.db.getRepository(Follower.name) as IFollowerRepository;
        try {
            let follower_id = 1;
            for(let i = 0; i < nb_users; i++) {
                let random_username = generator.generate(10);
                let random_email = random_username+"@gmail.com";
                let random_password = generator.generate(10);
                let creation_datetime = generator.randomDate();
                let user: User = userRepository.create(i, random_email, random_username, random_password, creation_datetime);
                for(let j = 0; j < this.max_followers; j++) {
                    let random_followed_id = Math.floor(Math.random() * nb_users);
                    let creation_datetime = generator.randomDate();
                    let follower: Follower = followerRepository.create(follower_id++, i, random_followed_id, creation_datetime);
                }
            }
            console.log('Users and followers inserted successfully');
        } catch (error) {
            console.error('Error inserting users:', error);
            throw error;
        }
    }
}

export default UserService;