import express from 'express';
import Neo4jDatabase from './db/neo4j/Neo4jDatabase';
import PostgresDatabase from './db/postgres/PostgresDatabase';

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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
