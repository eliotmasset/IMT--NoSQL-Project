import PostgresDatabase from '../postgres/PostgresDatabase';
import Neo4JDatabase from '../neo4j/Neo4jDatabase';
import RandomGenerator from './RandomService';

class ProductService {

  postgresDB: PostgresDatabase;
  neo4jDB: Neo4JDatabase;

  constructor() {
    this.postgresDB = PostgresDatabase.getInstance();
    this.neo4jDB = Neo4JDatabase.getInstance();
  }

  async insertRandomProducts(nb_products: number, nb_users: number): Promise<void> {
    const generator = new RandomGenerator('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
    let products: { id: number, name: string, barcode: string, price: number }[] = [];
    let session = this.neo4jDB.db.session();
    let sql = this.postgresDB.sql;
    try {
      await sql`INSERT INTO address (id, street, city, postal_code) VALUES (1, '1st street', '1st city', '34000')`;
      for (let i = 0; i < nb_products; i++) {
        let random_name = generator.generate(10);
        let random_barcode = generator.generate(13);
        let random_price = Math.floor(Math.random() * 10000) / 100;

        await session.run(`CREATE (p:Product {id: '${i}', name: '${random_name}', barcode: '${random_barcode}', price: '${random_price}'});`);
        products.push({ id: i, name: random_name, barcode: random_barcode, price: random_price });

        if (products.length % 16384 === 0) {
          await sql`INSERT INTO product ${sql(products, 'id', 'name', 'barcode', 'price')}`;
          products = [];
        }
      }
      if (products.length > 0) {
        await sql`INSERT INTO product ${sql(products, 'id', 'name', 'barcode', 'price')}`;
      }

      let orders: { user: number, product: number, billing_address: number, shipping_address: number, price: number, creation_date: Date }[] = [];
      for (let i = 0; i < nb_users; i++) {
        for (let j = 0; j < Math.round(Math.random() * 5); j++) {
          let random_price = Math.floor(Math.random() * 10000) / 100;
          let random_product = Math.ceil(Math.random() * (nb_products - 1));
          let creation_datetime = generator.randomDate();

          orders.push({ user: i, product: random_product, billing_address: 1, shipping_address: 1, price: random_price, creation_date: creation_datetime });
          if (orders.length % 10921 === 0) {
            await sql`INSERT INTO "order" ${sql(orders, 'user', 'billing_address', 'shipping_address', 'product', 'price', 'creation_date')}`;
            orders = [];
          }
          await session.run(`MATCH (u:User {id: '${i}'}), (p:Product {id: '${random_product}'}) CREATE (u)-[:ORDERED {price: '${random_price}', billing_address: 1, shipping_address: 1, creation_date: '${creation_datetime}'}]->(p);`);
        }
      }
      if (orders.length > 0) {
        await sql`INSERT INTO "order" ${sql(orders, 'user', 'billing_address', 'shipping_address', 'product', 'price', 'creation_date')}`;
      }
      console.log('Users and followers inserted successfully');
    } catch (error) {
      console.error('Error inserting users:', error);
      throw error;
    }
  }
}

export default ProductService;
