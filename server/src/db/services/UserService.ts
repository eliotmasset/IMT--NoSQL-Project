import PostgresDatabase from '../postgres/PostgresDatabase';
import Neo4JDatabase from '../neo4j/Neo4jDatabase';
import RandomGenerator from './RandomService';

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
    try {
      let follow_id = 1;
      let users: { id: number, email: string, username: string, password: string, creation_date: Date }[] = [];
      let followers: { id: number, follower: number, followed: number, creation_date: Date }[] = [];
      for (let i = 0; i < nb_users; i++) {
        let random_username = generator.generate(10);
        let random_email = random_username + "@gmail.com";
        let random_password = generator.generate(10);
        let creation_datetime = generator.randomDate();
        users.push({ id: i, email: random_email, username: random_username, password: random_password, creation_date: creation_datetime });
        await session.run(`CREATE (u:User {id: '${i}', email: '${random_email}', username: '${random_username}', password: '${random_password}', creation_date: '${creation_datetime}'});`);
        if (users.length % 13106 === 0) {
          await sql`INSERT INTO "user" ${sql(users, 'id', 'email', 'username', 'password', 'creation_date')}`;
          users = [];
        }
        let followeds = [i];
        for (let j = 0; j < Math.floor(Math.random() * this.max_followers); j++) {
          let random_followed_id = Math.ceil(Math.random() * (nb_users - 1));
          while (followeds.includes(random_followed_id)) {
            random_followed_id = Math.ceil(Math.random() * (nb_users - 1));
          }
          followeds.push(random_followed_id);
          let creation_datetime = generator.randomDate();
          followers.push({ id: follow_id, follower: i, followed: random_followed_id, creation_date: creation_datetime });
          await session.run(`MATCH (u1:User {id: '${i}'}), (u2:User {id: '${random_followed_id}'}) CREATE (u1)-[:FOLLOWS {id: '${follow_id}', creation_date: '${creation_datetime}'}]->(u2);`);
          follow_id++;
        }
      }
      if (users.length > 0) {
        await sql`INSERT INTO "user" ${sql(users, 'id', 'email', 'username', 'password', 'creation_date')}`;
      }
      for (let i = 0; i < followers.length; i += 16380) {
        await sql`INSERT INTO follow ${sql(followers.slice(i, i + 16380), 'id', 'follower', 'followed', 'creation_date')}`;
      }
      session.close();
      console.log('Users and followers inserted successfully');
    } catch (error) {
      console.error('Error inserting users:', error);
      throw error;
    }
  }
}

export default UserService;
