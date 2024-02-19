import Post from '../models/Post.ts';

interface IPostRepository {
    create(
        content: string,
        authorId: number,
        productId: number,
        creationDate: Date
    ): Post;

    findAllByAuthorId(authorId: number): [Post];
}

export default IPostRepository;
