class Api {
    private _url = 'http://localhost:3000';

    public async query1(db: string, userId: number, depth: number) {
        const res = await fetch(
            `${this._url}/stats/query1/${userId}?db=${db}&depth=${depth}`
        );

        return await res.json();
    }

    public async query2(
        db: string,
        userId: number,
        productId: number,
        depth: number
    ) {
        const res = await fetch(
            `${this._url}/stats/query2/${userId}/${productId}?db=${db}&depth=${depth}`
        );

        return await res.json();
    }

    public async query3(db: string, productId: number, depth: number) {
        const res = await fetch(
            `${this._url}/stats/query3/${productId}?db=${db}&depth=${depth}`
        );

        return await res.json();
    }
}

export default new Api();
