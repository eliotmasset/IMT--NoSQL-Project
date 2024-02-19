class Product {
    private _id: number;
    private _name: string;
    private _barcode: string;
    private _price: number;

    constructor(id: number, name: string, barcode: string, price: number) {
        this._id = id;
        this._name = name;
        this._barcode = barcode;
        this._price = price;
    }

    public get Id(): number {
        return this._id;
    }

    public get Name(): string {
        return this._name;
    }

    public get Barcode(): string {
        return this._barcode;
    }

    public get Price(): number {
        return this._price;
    }
}

export default Product;
