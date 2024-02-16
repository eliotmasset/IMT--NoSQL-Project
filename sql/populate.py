import psycopg2
from neo4j import GraphDatabase
from faker import Faker
from datetime import datetime
from random import randint, choice, random
import string

def id_generator(size=8, chars=string.ascii_uppercase + string.digits):
    return ''.join(choice(chars) for _ in range(size))

# Connect to PostgreSQL
postgres_conn = psycopg2.connect(
    host="localhost",
    port="5432",
    database="db",
    user="admin",
    password=""
)

postgres_cursor = postgres_conn.cursor()

# Connect to Neo4j
neo4j_driver = GraphDatabase.driver(
    "bolt://localhost:7687",
    auth=("admin", "")
)

neo4j_session = neo4j_driver.session()

postgres_cursor.execute('DELETE FROM "reaction"')
postgres_cursor.execute('DELETE FROM "post"')
postgres_cursor.execute('DELETE FROM "product"')
postgres_cursor.execute('DELETE FROM "follow"')
postgres_cursor.execute('DELETE FROM "user"')
postgres_conn.commit()
neo4j_session.run("MATCH (n) DETACH DELETE n")

nb_users = 10
nb_products = 10000

print("Populating with " + str(nb_users) + " users and " + str(nb_products) + " products")
print("Populating Users...")
# Generate and insert random data
for i in range(nb_users):
    # Generate random data
    random_username = Faker().user_name()
    random_email = Faker().email()
    random_password = Faker().password()
    creation_date = datetime.now()

    # Insert into PostgreSQL
    postgres_cursor.execute('INSERT INTO "user" (id, username, email, password, creation_date) VALUES (%s, %s, %s, %s, %s)', (i, random_username, random_email, random_password, creation_date))

    # Insert into Neo4j
    neo4j_session.run("CREATE (u:User {id: $id, username: $username, email: $email, password: $password, creation_date: $creation_date})", id=i, username=random_username, email=random_email, password=random_password, creation_date=creation_date)

    max_followers = 20
    if(i < max_followers):
        max_followers = i
    followed = []
    for _ in range(Faker().random_int(0, max_followers)):
        random_user = Faker().random_int(0, i-1) # don't take the current user
        while followed.count(random_user) > 0:
            random_user = Faker().random_int(0, i-1) # don't take the current user
        followed.append(random_user)
        postgres_cursor.execute('INSERT INTO "follow" (follower, followed, creation_date) VALUES (%s, %s, %s)', (i, random_user, creation_date))
        postgres_conn.commit()

        neo4j_session.run("MATCH (u1:User {id: $follower}), (u2:User {id: $followed}) CREATE (u1)-[:FOLLOWS {creation_date: $creation_date}]->(u2)", follower=i, followed=random_user, creation_date=creation_date)

print("Populating Products...")
id_post = 0
for i in range(nb_products):
    if(i % 100 == 0):
        print(str(int((i/nb_products) * 100)) + "%", end="\r")
    random_name = id_generator()
    random_barcode = id_generator(13)
    random_price = randint(1, 1000) + random()

    postgres_cursor.execute('INSERT INTO "product" (id, name, barcode, price) VALUES (%s, %s, %s, %s)', (i, random_name, random_barcode, random_price))

    neo4j_session.run("CREATE (p:Product {id: $id, name: $name, barcode: $barcode, price: $price})", id=i, name=random_name, barcode=random_barcode, price=random_price)

    for j in range(randint(0, 5)):
        id_post += 1
        random_user = 1
        random_content = id_generator(50)
        creation_date = datetime.now()

        users_reacted = [random_user]

        postgres_cursor.execute('INSERT INTO "post" (id, "user", product, content, creation_date) VALUES (%s, %s, %s, %s, %s)', (id_post, random_user, i, random_content, creation_date))

        neo4j_session.run("CREATE (p:Post {id: $id, content: $content, creation_date: $creation_date})-[:ABOUT]->(pr:Product {id: $product})", id=id_post, content=random_content, creation_date=creation_date, product=i)
        neo4j_session.run("MATCH (u:User {id: $user}), (p:Post {id: $post}) CREATE (u)-[:PUBLISHED {creation_date: $creation_date}]->(p)", user=random_user, post=id_post, creation_date=creation_date)

        for _ in range(randint(0, 10)):
            random_user = randint(0, nb_users-1)
            while users_reacted.count(random_user) > 0:
                random_user = randint(0, nb_users-1)
            
            users_reacted.append(random_user)

            postgres_cursor.execute('INSERT INTO "reaction" ("user", post, reaction, creation_date) VALUES (%s, %s, %s, %s)', (random_user, id_post, Faker().random_element(elements=('LIKE', 'DISLIKE')), creation_date))
            postgres_conn.commit()

            neo4j_session.run("MATCH (u:User {id: $user}), (p:Post {id: $post}) CREATE (u)-[:REACTED {reaction: $reaction, creation_date: $creation_date}]->(p)", user=random_user, post=id_post, reaction=Faker().random_element(elements=('LIKE', 'DISLIKE')), creation_date=creation_date)
    

# Close connections
postgres_cursor.close()
postgres_conn.close()
neo4j_session.close()
neo4j_driver.close()