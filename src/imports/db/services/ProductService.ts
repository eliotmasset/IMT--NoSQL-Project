import IDatabase from '../interfaces/IDatabase';
import IPostRepository from '../interfaces/IPostRepository';
import IProductRepository from '../interfaces/IProductRepository';
import IReactionRepository from '../interfaces/IReactionRepository';
import Post from '../models/Post';
import Product from '../models/Product';
import Reaction from '../models/Reaction';
import ReactionType from '../models/ReactionType';

class ProductService {

    db: IDatabase;

    constructor(db: IDatabase) {
        this.db = db;
    }

    async insertRandomProducts(nb_products: number, nb_users: number): Promise<void> {
        const generator = new RandomStringGenerator('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
        let productRepository = this.db.getRepository(Product.name) as IProductRepository;
        let postRepository = this.db.getRepository(Post.name) as IPostRepository;
        let reactionRepository = this.db.getRepository(Reaction.name) as IReactionRepository;
        try {
            let post_id = 1;
            let reaction_id = 1;
            for(let i = 0; i < nb_products; i++) {
                let random_name = generator.generate(10);
                let random_barcode = generator.generate(13);
                let random_price = Math.floor(Math.random() * 10000) / 100;

                let product: Product = productRepository.create(i, random_name, random_barcode, random_price);

                let users_posts: number[] = [];
                for(let j = 0; j < Math.round(Math.random() * 5); j++) {
                    let random_content = generator.generate(20);
                    let random_date = generator.randomDate();
                    let random_user = Math.floor(Math.random() * nb_users);

                    if (users_posts.includes(random_user)) {
                        continue;
                    }

                    users_posts.push(random_user);

                    let post: Post = postRepository.create(post_id, random_content, random_user, i, random_date);

                    let users_reacted: number[] = [];
                    for(let k = 0; k < Math.round(Math.random() * 10); k++) {
                        let random_user = Math.floor(Math.random() * nb_users);
                        let random_reaction = Math.random() > 0.5 ? ReactionType.LIKE : ReactionType.DISLIKE;
                        let creation_datetime = generator.randomDate();

                        if (users_reacted.includes(random_user)) {
                            continue;
                        }

                        users_reacted.push(random_user);

                        let reaction: Reaction = reactionRepository.create(reaction_id, random_user, post_id, random_reaction, creation_datetime);
                        reaction_id++;
                    }
                    post_id++;
                }
            }
            console.log('Users and followers inserted successfully');
        } catch (error) {
            console.error('Error inserting users:', error);
            throw error;
        }
    }
}

export default ProductService;