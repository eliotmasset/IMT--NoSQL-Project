import { Driver, auth, driver } from 'neo4j-driver';

class Neo4jDatabase {
    private static instance: Neo4jDatabase | null = null;
    private _db: Driver;

    private constructor() {
        this._db = driver('neo4j://localhost', auth.basic('admin', 'admin'));
    }

    public static getInstance(): Neo4jDatabase {
        if (this.instance === null) {
            this.instance = new this();
        }

        return this.instance;
    }

    public get db(): Driver {
        return this._db;
    }
}

export default Neo4jDatabase;
