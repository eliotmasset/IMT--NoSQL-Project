class Address {
    private _id: number;
    private _street: string;
    private _city: string;
    private _postalCode: string;

    constructor(id: number, street: string, city: string, postalCode: string) {
        this._id = id;
        this._street = street;
        this._city = city;
        this._postalCode = postalCode;
    }

    public get Id(): number {
        return this._id;
    }

    public get Street(): string {
        return this._street;
    }

    public get City(): string {
        return this._city;
    }

    public get PostalCode(): string {
        return this._postalCode;
    }
}

export default Address;
