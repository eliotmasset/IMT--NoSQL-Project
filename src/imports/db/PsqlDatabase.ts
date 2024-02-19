class PsqlDatabase {
    private static instance: PsqlDatabase | null = null;
    public value: number;

    private constructor() {
        this.value = Math.random();
    }

    public static getInstance(): PsqlDatabase {
        if (this.instance === null) {
            this.instance = new this();
        }

        return this.instance;
    }
}

export default PsqlDatabase;
