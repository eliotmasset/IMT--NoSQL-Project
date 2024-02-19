class Product {
    private id: number;
    private name: string;
    private barcode: string;
    private price: number;

    constructor(id: number, name: string, barcode: string, price: number) {
        this.id = id;
        this.name = name;
        this.barcode = barcode;
        this.price = price;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getBarcode(): string {
        return this.barcode;
    }

    public getPrice(): number {
        return this.price;
    }
}

export default Product;
