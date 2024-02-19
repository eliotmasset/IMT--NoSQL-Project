class Post {
    private _id: number;
    private _content: string;
    private _authorId: number;
    private _productId: number | null;
    private _creationDate: Date;

    constructor(
        id: number,
        content: string,
        authorId: number,
        productId: number | null,
        creationDate: Date
    ) {
        this._id = id;
        this._content = content;
        this._authorId = authorId;
        this._productId = productId;
        this._creationDate = creationDate;
    }

    public get Id(): number {
        return this._id;
    }

    public get Content(): string {
        return this._content;
    }

    public get AuthorId(): number {
        return this._authorId;
    }

    public get ProductId(): number | null {
        return this._productId;
    }

    public get CreationDate(): Date {
        return this._creationDate;
    }
}
