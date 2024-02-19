import ReactionType from './ReactionType';

class Reaction {
    private _id: number;
    private _userId: number;
    private _postId: number;
    private _reactionType: ReactionType;
    private _creationDate: Date;

    constructor(
        id: number,
        userId: number,
        postId: number,
        reactionType: ReactionType,
        creationDate: Date
    ) {
        this._id = id;
        this._userId = userId;
        this._postId = postId;
        this._reactionType = reactionType;
        this._creationDate = creationDate;
    }

    public get Id(): number {
        return this._id;
    }

    public get UserId(): number {
        return this._userId;
    }

    public get PostId(): number {
        return this._postId;
    }

    public get ReactionType(): ReactionType {
        return this._reactionType;
    }

    public get CreationDate(): Date {
        return this._creationDate;
    }
}

export default Reaction;
