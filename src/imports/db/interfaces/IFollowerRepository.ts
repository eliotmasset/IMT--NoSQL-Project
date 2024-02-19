import Follower from '../models/Follower.ts';

interface IFollowerRepository {
    create(
        followerId: number,
        followedId: number,
        creationDate: Date
    ): Follower;

    findAllByFollowerId(followerId: number): [Follower];

    findAllByFollowedId(followedId: number): [Follower];
}

export default IFollowerRepository;
