class User {
    private id: number;
    private username: string;
    private email: string;
    private password: string;
    private creationDate: Date;

    constructor(
        id: number,
        email: string,
        username: string,
        password: string,
        creationDate: Date
    ) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.creationDate = creationDate;
    }

    public getId(): number {
        return this.id;
    }

    public getEmail(): string {
        return this.email;
    }

    public getUsername(): string {
        return this.username;
    }

    public getPassword(): string {
        return this.password;
    }

    public getCreationDate(): Date {
        return this.creationDate;
    }
}

export default User;
