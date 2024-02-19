class Follower {
    private _id: number;
    private _followerId: number;
    private _followedId: number;
    private _creationDate: Date;

    constructor(
        id: number,
        followerId: number,
        followedId: number,
        creationDate: Date
    ) {
        this._id = id;
        this._followerId = followerId;
        this._followedId = followedId;
        this._creationDate = creationDate;
    }

    public get Id(): number {
        return this._id;
    }

    public get FollowerId(): number {
        return this._followerId;
    }

    public get FollowedId(): number {
        return this._followedId;
    }

    public get CreationDate(): Date {
        return this._creationDate;
    }
}

export default Follower;
