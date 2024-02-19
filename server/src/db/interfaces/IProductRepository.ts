import Product from '../models/Product.ts';

interface IProductRepository {
    create(id: number, name: string, barcode: string, price: number): Product;

    find(id: number): Product | null;
}

export default IProductRepository;
