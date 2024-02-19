import IAddressRepository from './IAddressRepository.ts';
import IFollowerRepository from './IFollowerRepository.ts';
import IPostRepository from './IPostRepository.ts';
import IProductRepository from './IProductRepository.ts';
import IReactionRepository from './IReactionRepository.ts';
import IUserRepository from './IUserRepository.ts';

interface IDatabase {
    getRepository(
        classname: string
    ):
        | IAddressRepository
        | IFollowerRepository
        | IPostRepository
        | IProductRepository
        | IUserRepository
        | IReactionRepository;
}

export default IDatabase;
