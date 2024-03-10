import StatDto from '../../controllers/StatDto';

interface IStatsRepository {
    createIndex(): Promise<boolean>;

    dropIndex(): Promise<boolean>;

    getOrdersByUser(userId: number, depth: number): Promise<StatDto>;

    getOrdersByUserAndProduct(
        userId: number,
        productId: number,
        depth: number
    ): Promise<StatDto>;

    getUsersByProduct(productId: number, depth: number): Promise<StatDto>;
}

export default IStatsRepository;
