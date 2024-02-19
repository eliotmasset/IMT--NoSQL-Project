import IProductRepository from './IProductRepository.ts';
import IUserRepository from './IUserRepository.ts';

interface IDatabase {
    getRepository(classname: string): IUserRepository | IProductRepository;
}

export default IDatabase;
