import IProductRepository from '../interfaces/IProductRepository.ts';
import Product from '../models/Product.ts';

class PostgresProductRepository implements IProductRepository {
    public find(id: number): Product | null {
        return null;
    }
}

export default PostgresProductRepository;
