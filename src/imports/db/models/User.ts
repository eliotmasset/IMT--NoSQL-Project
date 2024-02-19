class User {
    private _id: number;
    private _username: string;
    private _email: string;
    private _password: string;
    private _creationDate: Date;

    constructor(
        id: number,
        email: string,
        username: string,
        password: string,
        creationDate: Date
    ) {
        this._id = id;
        this._email = email;
        this._username = username;
        this._password = password;
        this._creationDate = creationDate;
    }

    public get Id(): number {
        return this._id;
    }

    public get Email(): string {
        return this._email;
    }

    public get Username(): string {
        return this._username;
    }

    public get Password(): string {
        return this._password;
    }

    public get CreationDate(): Date {
        return this._creationDate;
    }
}

export default User;
