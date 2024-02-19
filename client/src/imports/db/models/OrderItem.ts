class OrderItem {
    private _id: number;
    private _orderId: number;
    private _productId: number;
    private _price: number;

    constructor(id: number, orderId: number, productId: number, price: number) {
        this._id = id;
        this._orderId = orderId;
        this._productId = productId;
        this._price = price;
    }

    public get Id(): number {
        return this._id;
    }

    public get OrderId(): number {
        return this._orderId;
    }

    public get ProductId(): number {
        return this._productId;
    }

    public get Price(): number {
        return this._price;
    }
}

export default OrderItem;
