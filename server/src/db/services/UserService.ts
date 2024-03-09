import PostgresDatabase from '../postgres/PostgresDatabase';
import Neo4JDatabase from '../neo4j/Neo4jDatabase';
import RandomGenerator from './RandomService';
import fs from 'fs';


class UserService {

  max_followers = 20;

  postgresDB: PostgresDatabase;
  neo4jDB: Neo4JDatabase;

  constructor() {
    this.postgresDB = PostgresDatabase.getInstance();
    this.neo4jDB = Neo4JDatabase.getInstance();
  }

  async insertRandomUsers(nb_users: number): Promise<void> {
    const generator = new RandomGenerator('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
    let session = this.neo4jDB.db.session();
    let sql = this.postgresDB.sql;
    const filenameUser = '/tmp_import' + generator.generate(5) + '.csv';
    const writableUserStream = fs.createWriteStream("/data" + filenameUser);
    const user_columns = [
      'id',
      'email',
      'username',
      'password',
      'creation_date'
    ];
    const follow_columns = [
      'id',
      'random_followed_id',
      'follow_id',
      'creation_date'
    ];

    var max_user_id = 0;
    var max_follow_id = 0;
    var result = await session.run(`MATCH (n:User) RETURN MAX(n.id) as max`);
    max_user_id = parseInt(result.records[0].get('max') ?? 0) + 1;
    result = await session.run(`MATCH (n:Follow) RETURN MAX(n.id) as max`);
    max_follow_id = parseInt(result.records[0].get('max') ?? 0) + 1;
    if (max_user_id == 1) {
      max_user_id = 0;
    }
    if (max_follow_id == 1) {
      max_follow_id = 0;
    }

    var start = Date.now();

    writableUserStream.write(user_columns.join(',') + '\n', function(err) { console.log(err); });
    try {
      let follow_id = 1;
      let users: { id: number, email: string, username: string, password: string, creation_date: Date }[] = [];
      let followers: { id: number, follower: number, followed: number, creation_date: Date }[] = [];
      for (let i = 0; i < nb_users; i++) {
        let random_username = generator.generate(10);
        let random_email = random_username + "@gmail.com";
        let random_password = generator.generate(10);
        let creation_datetime = generator.randomDate();
        users.push({ id: max_user_id + i, email: random_email, username: random_username, password: random_password, creation_date: creation_datetime });
        writableUserStream.write(`${max_user_id + i},${random_email},${random_username},${random_password},${creation_datetime}\n`, function(err) { console.log(err); });
        //await session.run(`CREATE (u:User {id: '${i}', email: '${random_email}', username: '${random_username}', password: '${random_password}', creation_date: '${creation_datetime}'});`);
        if (users.length % 13106 === 0) {
          await sql`INSERT INTO "user" ${sql(users, 'id', 'email', 'username', 'password', 'creation_date')}`;
          users = [];
        }
        let followeds = [i];
        for (let j = 0; j < Math.floor(Math.random() * this.max_followers); j++) {
          let random_followed_id = Math.ceil(Math.random() * (nb_users - 1 + max_user_id));
          while (followeds.includes(random_followed_id)) {
            random_followed_id = Math.ceil(Math.random() * (nb_users - 1 + max_user_id));
          }
          followeds.push(random_followed_id);
          let creation_datetime = generator.randomDate();
          followers.push({ id: max_follow_id + follow_id, follower: i, followed: random_followed_id, creation_date: creation_datetime });
          //await session.run(`MATCH (u1:User {id: '${i}'}), (u2:User {id: '${random_followed_id}'}) CREATE (u1)-[:FOLLOWS {id: '${follow_id}', creation_date: '${creation_datetime}'}]->(u2);`);
          follow_id++;
        }
      }
      if (users.length > 0) {
        await sql`INSERT INTO "user" ${sql(users, 'id', 'email', 'username', 'password', 'creation_date')}`;
      }
      for (let i = 0; i < followers.length; i += 16380) {
        await sql`INSERT INTO follow ${sql(followers.slice(i, i + 16380), 'id', 'follower', 'followed', 'creation_date')}`;
      }
      writableUserStream.end();
      await session.run(`DROP INDEX u_id IF EXISTS;`);
      await session.run(`LOAD CSV WITH HEADERS FROM 'file://${filenameUser}' AS row CREATE (u:User {id: toInteger(row.id), email: row.email, username: row.username, password: row.password, creation_date: row.creation_date});`);
      console.log('Users inserted successfully');
      await session.run(`CREATE INDEX u_id FOR (u:User) ON (u.id);`);
      console.log('Index created successfully');
      for (let i = 0; i < followers.length; i++) {
        await session.run(`MATCH (u1:User {id: ${followers[i].follower}}), (u2:User {id: ${followers[i].followed}}) USING INDEX u1:User(id) USING INDEX u2:User(id) CREATE (u1)-[:FOLLOWS {id: ${followers[i].id}, creation_date: '${followers[i].creation_date}'}]->(u2);`);
        if (i % 10000 == 0) {
          var seconds = Date.now() - start;
          start = Date.now();
          console.log(`${i} followers inserted successfully in ${seconds / 1000} seconds`);
        }
      }
      console.log('Followers inserted successfully');
      session.close();
      writableUserStream.end();
      console.log('Users and followers inserted successfully');
    } catch (error) {
      console.error('Error inserting users:', error);
      throw error;
    }
  }
}

export default UserService;
