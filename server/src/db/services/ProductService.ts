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
        const generator = new RandomGenerator('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
        let products= [];
        let posts = [];
        let reactions = [];
        try {
            let post_id = 1;
            let reaction_id = 1;
            for(let i = 0; i < nb_products; i++) {
                let random_name = generator.generate(10);
                let random_barcode = generator.generate(13);
                let random_price = Math.floor(Math.random() * 10000) / 100;

                let neo4jRequest = `CREATE (p:Product {id: '${i}', name: '${random_name}', barcode: '${random_barcode}', price: '${random_price}'});`;
                products.push({id: i, name: random_name, barcode: random_barcode, price: random_price});

                for(let j = 0; j < Math.round(Math.random() * 5); j++) {
                    let random_content = generator.generate(20);
                    let random_date = generator.randomDate();
                    let random_user = Math.ceil(Math.random() * nb_users);

                    posts.push({id: post_id, author: random_user, product: i, content: random_content, creation_date: random_date});

                    let users_reacted: number[] = [];
                    for(let k = 0; k < Math.round(Math.random() * 10); k++) {
                        let random_user = Math.ceil(Math.random() * nb_users);
                        let random_reaction = Math.random() > 0.5 ? ReactionType.LIKE : ReactionType.DISLIKE;
                        let creation_datetime = generator.randomDate();

                        if (users_reacted.includes(random_user)) {
                            continue;
                        }

                        users_reacted.push(random_user);

                        reactions.push({id: reaction_id, user: random_user, post: post_id, reaction: random_reaction, creation_date: creation_datetime});
                        reaction_id++;
                    }
                    post_id++;
                }
            }
            let orders = [];
            for(let i = 0; i < nb_users; i++) {
                for(j = 0; j < Math.round(Math.random() * 5); j++) {
                    let random_price = Math.floor(Math.random() * 10000) / 100;
                    let random_product = Math.ceil(Math.random() * nb_products);
                    let creation_datetime = generator.randomDate();

                    orders.push({user: i, product: random_product, price: random_price, creation_date: creation_datetime});
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
