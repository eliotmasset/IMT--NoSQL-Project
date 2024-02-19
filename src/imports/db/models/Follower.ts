import User from "./User";

class Follower {
    private id: number;
    private followerId: number;
    private followedId: number;
    private creationDate: Date;

    constructor(id: number, followerId: number, followedId: number, creationDate: Date) {
        this.id = id;
        this.followerId = followerId;
        this.followedId = followedId;
        this.creationDate = creationDate;
    }

    public getId(): number {
        return this.id;
    }

    public getfollowerId(): number {
        return this.followerId;
    }

    public getfollowedId(): number {
        return this.followedId;
    }

    public getCreationDate(): Date {
        return this.creationDate;
    }

}

export default User;
