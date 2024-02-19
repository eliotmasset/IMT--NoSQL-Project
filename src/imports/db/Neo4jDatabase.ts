class Neo4jDatabase {
    private static instance: Neo4jDatabase | null = null;
    public value: number;

    private constructor() {
        this.value = Math.random();
    }

    public static getInstance(): Neo4jDatabase {
        if (this.instance === null) {
            this.instance = new this();
        }

        return this.instance;
    }
}

export default Neo4jDatabase;
