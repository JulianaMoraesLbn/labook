import { IPostDataBase } from "../../Core/business/ports/services";
import { DataBaseErr } from "../../Core/entities/customError";
import { getIdLikeDTO, inputCommentPostDataDTO, inputFeedDataDTO, inputPostLikeDataDTO, Post, postModel } from "../../Core/entities/Post";
import { connectionDataBase } from "./connectionDataBase";


export class PostDataBase extends connectionDataBase implements IPostDataBase {

    public createPost = async (post: Post):Promise<void> => {

        try {

            const { id, photo, description, type, author_id } = post

            await PostDataBase.connection("post_labook")
                .insert({
                    id,
                    photo,
                    description,
                    type,
                    create_at: post.createdAt.toISOString().split("T")[0],
                    author_id
                })

        } catch (err: any) {
            throw new DataBaseErr(err.sqlMessage)
        }
    }

    public getPostId = async (id: string): Promise<Post> => {

        try {

            const result: any = await PostDataBase.connection("post_labook")
                .select("*")
                .where({ id })

            return postModel(result[0])

        } catch (err: any) {
            throw new DataBaseErr(err.sqlMessage)
        }

    }

    public getPostByType = async (inputFeedData: inputFeedDataDTO): Promise<Post[]> => {

        const { size, offset, typePost } = inputFeedData

        try {

            const result: any = await PostDataBase.connection("post_labook")
                .select("*")
                .where("type", typePost)
                .limit(size)
                .offset(offset)

            let allPost = []
            for (let element of result) {
                allPost.push(postModel(element))
            }

            return allPost

        } catch (err: any) {
            throw new DataBaseErr(err.sqlMessage)
        }

    }

    public getIdLikePost = async (inputPostLikeData: getIdLikeDTO): Promise<string> => {
        
        try {

            const { idUser, idPost } = inputPostLikeData

            const result = await PostDataBase.connection("like_Post")
                .select("*")
                .where("id_user", idUser)
                .andWhere("id_post", idPost)

            return result[0].id

        } catch (err: any) {
            throw new DataBaseErr(err.sqlMessage)
        }
    }

    public postLike = async (inputPostLikeData: inputPostLikeDataDTO):Promise<void> => {

        try {

            const { id, idPost, idUser } = inputPostLikeData

            await PostDataBase.connection("like_Post")
                .insert({
                    id,
                    id_user: idUser,
                    id_post: idPost
                })

        } catch (err: any) {
            throw new DataBaseErr(err.sqlMessage)
        }
    }

    public postUnlike = async (id: string):Promise<void> => {

        try {

            await PostDataBase.connection("like_Post")
                .where({id})
                .del("*")

        } catch (err: any) {
            throw new DataBaseErr(err.sqlMessage)
        }
    }

    public createCommentPost = async (inputCommentPostData:inputCommentPostDataDTO):Promise<void> => {

        const {id, comment_post, idPost, idUser} = inputCommentPostData

        await PostDataBase.connection("comment_post")
        .insert({
            id,
            comment_post,
            id_user: idUser,
            id_post: idPost
        })
    }

    /* passar para a classe de User */
    public getIdFriends = async (id: string):Promise <string[]> => {

        const result = await PostDataBase.connection("friend_labook")
        .select("id_friend_two")
        .where("id_friend_one", id)

        return result.flatMap(array => array.id_friend_two)
    }

    public getFeedByUser = async (inputIdFriends:string[]):Promise<Post[]> => {

        const result = await PostDataBase.connection.raw(`
        SELECT * FROM post_labook WHERE author_id in (${inputIdFriends.map(id => `"${id}"`)})
        `)

        return result[0].flatMap((elem: any) => postModel(elem))
        
    }
}
