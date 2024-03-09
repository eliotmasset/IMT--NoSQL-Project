import express from 'express';
import cors from 'cors';
import Neo4jDatabase from './db/neo4j/Neo4jDatabase';
import PostgresDatabase from './db/postgres/PostgresDatabase';
import UserService from './db/services/UserService';
import ProductService from './db/services/ProductService';
import StatsController from './controllers/StatsController';

// let psql = PostgresDatabase.getInstance();
// psql.sql`SELECT * FROM user`.then((value) => console.log(value));

// let session = Neo4jDatabase.getInstance().db.session();
// session.run('MATCH (u:User) RETURN u').subscribe({
//     onKeys: (keys) => {
//         console.log(keys);
//     },
//     onNext: (record) => {
//         console.log(record.get('u').properties.password);
//     },
//     onCompleted: () => {
//         session.close(); // returns a Promise
//     },
//     onError: (error) => {
//         console.log(error);
//     },
// });

const app = express();
const port = 3000;

async function init() {
  let userService = new UserService();
  let productService = new ProductService();
  await userService.insertRandomUsers(1000000);
  productService.insertRandomProducts(10000, 10000);
}

app.use(cors());

app.get('/', async (req, res) => {
  res.json({
    content: 'Hello World !',
  });
});

app.use('/stats', new StatsController().router);

app.get('/generate', async (req, res) => { });

app.get('/generateUsers', async (req, res) => {
  let service: UserService = new UserService();
  await service.insertRandomUsers(10000);
  res.json({
    content: 'Users generated successfully',
  });
});

app.get('/generateProducts', async (req, res) => {
  let service: ProductService = new ProductService();
  await service.insertRandomProducts(10000, 10000);
  res.json({
    content: 'Products generated successfully',
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  // after 10 seconds :
  setTimeout(() => {
    init();
  }, 10000);
});
