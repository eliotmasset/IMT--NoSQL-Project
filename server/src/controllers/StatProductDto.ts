class StatProductDto {
    public productId: number;
    public productName: string;
    public quantity: number;

    constructor(productId: number, productName: string, quantity: number) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
    }
}

export default StatProductDto;
