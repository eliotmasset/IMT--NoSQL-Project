import Product from '../models/Product.ts';

interface IProductRepository {
    find(id: number): Product | null;
}

export default IProductRepository;
