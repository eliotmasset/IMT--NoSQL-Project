class Order {
    private _id: number;
    private _userId: number;
    private _billingAddressId: number;
    private _shippingAddressId: number;
    private _productId: number;
    private _price: number;
    private _creationDate: Date;

    constructor(
        id: number,
        userId: number,
        billingAddressId: number,
        shippingAddressId: number,
        productId: number,
        price: number,
        creationDate: Date
    ) {
        this._id = id;
        this._userId = userId;
        this._billingAddressId = billingAddressId;
        this._shippingAddressId = shippingAddressId;
        this._productId = productId;
        this._price = price;
        this._creationDate = creationDate;
    }

    public get Id(): number {
        return this._id;
    }

    public get UserId(): number {
        return this._userId;
    }

    public get BillingAddressId(): number {
        return this._billingAddressId;
    }

    public get ShippingAddressId(): number {
        return this._shippingAddressId;
    }

    public get ProductId(): number {
        return this._productId;
    }

    public get Price(): number {
        return this._price;
    }

    public get CreationDate(): Date {
        return this._creationDate;
    }
}

export default Order;
