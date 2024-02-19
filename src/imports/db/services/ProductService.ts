import IDatabase from '../interfaces/IDatabase';
import Product from '../models/Product';

class ProductService {

    db: IDatabase;

    constructor(db: IDatabase) {
        this.db = db;
    }

    async insertRandomProducts(nb_products: number, nb_users: number): Promise<void> {
        const generator = new RandomStringGenerator('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
        let productRepository = this.db.getRepository(Product.name);
        let postRepository = this.db.getRepository(Post.name);
        let reactionRepository = this.db.getRepository(Reaction.name);
        try {
            let post_id = 1;
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

                    let post: Post = postRepository.create(post_id, random_user, i, random_content, random_date);

                    let users_reacted: number[] = [];
                    for(let k = 0; k < Math.round(Math.random() * 10); k++) {
                        let random_user = Math.floor(Math.random() * nb_users);
                        let random_reaction = Math.random() > 0.5 ? 'LIKE' : 'DISLIKE';
                        let creation_datetime = generator.randomDate();

                        if (users_reacted.includes(random_user)) {
                            continue;
                        }

                        users_reacted.push(random_user);

                        let reaction: Reaction = reactionRepository.create(random_user, post_id, random_reaction, creation_datetime);
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

    async clearUsers(): Promise<void> {
        try {
            this.db.getRepository(Product.name).clear();
        } catch (error) {
            console.error('Error clearing users:', error);
            throw error;
        }
    }
}

export default ProductService;