import express from 'express';
import Neo4jDatabase from './db/neo4j/Neo4jDatabase';
import PostgresDatabase from './db/postgres/PostgresDatabase';
import UserService from './db/services/UserService';

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

app.get('/', async (req, res) => {
    res.json({
        content: 'Hello World !',
    });
});

app.get('/generate', async (req, res) => {});

app.get('/generateUsers', async(req, res) => {
  let service: UserService = new UserService();
  await service.insertRandomUsers(10000);
  res.json({
    content: 'Users generated successfully',
  });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
