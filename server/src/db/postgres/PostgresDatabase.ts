import postgres, { Sql } from 'postgres';

class PostgresDatabase {
    private static _instance: PostgresDatabase | null = null;
    private _sql: Sql;

    private constructor() {
        this._sql = postgres('', { database: 'db', username: 'admin' });
    }

    public static getInstance(): PostgresDatabase {
        if (this._instance === null) {
            this._instance = new this();
        }

        return this._instance;
    }

    public get sql(): Sql {
        return this._sql;
    }
}

export default PostgresDatabase;
