import Reaction from '../models/Reaction.ts';
import ReactionType from '../models/ReactionType.ts';

interface IReactionRepository {
    create(
        id: number,
        userId: number,
        postId: number,
        reactionType: ReactionType,
        creationDate: Date
    ): Reaction;

    findAllByUserId(userId: number): [Reaction];

    findAllByPostId(postId: number): [Reaction];
}

export default IReactionRepository;
