import { DataBaseErr, LikePostNotFound } from "../../Common/customError";
import { getIdLikeDTO, inputCommentPostDataDTO, inputFeedDataDTO, inputPostLikeDataDTO, Post, postModel } from "../ports/repository/dtos/dtoPost";
import { IPostDataBase } from "../ports/repository/repositories/repositoriesPostData";
import { connectionDataBase } from "./connectionDataBase";



export class PostDataBase extends connectionDataBase implements IPostDataBase {


    public createPost = async (post: Post): Promise<void> => {

        try {

            const { id, photo, description, type, authorId } = post

            await PostDataBase.connection("post_labook")
                .insert({
                    id,
                    photo,
                    description,
                    type,
                    create_at: post.createdAt.toISOString().split("T")[0],
                    author_id: authorId
                })

        } catch (err: any) {
            throw new DataBaseErr(err.sqlMessage || err.message)
        }
    }

    public getPostId = async (id: string): Promise<Post> => {

        try {

            const result: any = await PostDataBase.connection("post_labook")
                .select("*")
                .where({ id })

            return postModel(result[0])

        } catch (err: any) {
            throw new DataBaseErr(err.sqlMessage || err.message)
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
            throw new DataBaseErr(err.sqlMessage || err.message)
        }

    }

    //Darvas disse q até 2 posso passar direto
    //Isso não deixa o código mais vunerável?
    //quando tenho um tipo, fico presa ao tipo
    //dessa forma não teria uma regra a ser seguida

    public getIdLikePost = async (idPost: string, idUser: string): Promise<string> => {

        try {
            console.log("entrou")
            /*  const { idUser, idPost } = inputPostLikeData */

            const result = await PostDataBase.connection("like_Post")
                .select("*")
                .where("id_user", idUser)
                .andWhere("id_post", idPost)

            console.log("retorno data", result[0])

            if (result[0] === undefined) {
                console.log("chegou aqui")
                throw new LikePostNotFound
            }


            return result[0].id


        } catch (err: any) {
            throw new DataBaseErr(err.sqlMessage || err.message)
        }
    }

    //tem haver com o post ou com o usuário?
    public likePostByUser = async (idPost: string, idUser: string): Promise<boolean> => {


        try {

            const result = await PostDataBase.connection("like_Post")
                .select("*")
                .where("id_user", idUser)
                .andWhere("id_post", idPost)

            return !!result[0]
            //return Boolean(result[0].id)

        } catch (err: any) {
            throw new DataBaseErr(err.sqlMessage || err.message)
        }

    }


    public postLike = async (inputPostLikeData: inputPostLikeDataDTO): Promise<void> => {

        try {

            const { id, idPost, idUser } = inputPostLikeData

            await PostDataBase.connection("like_Post")
                .insert({
                    id,
                    id_user: idUser,
                    id_post: idPost
                })

        } catch (err: any) {
            throw new DataBaseErr(err.sqlMessage || err.message)
        }
    }

    public postUnlike = async (id: string): Promise<void> => {

        try {

            await PostDataBase.connection("like_Post")
                .where({ id })
                .del("*")

        } catch (err: any) {
            throw new DataBaseErr(err.sqlMessage || err.message)
        }
    }

    public createCommentPost = async (inputCommentPostData: inputCommentPostDataDTO): Promise<void> => {

        try {

            const { id, comment_post, idPost, idUser } = inputCommentPostData

            await PostDataBase.connection("comment_post")
                .insert({
                    id,
                    comment_post,
                    id_user: idUser,
                    id_post: idPost
                })

        } catch (err: any) {
            throw new DataBaseErr(err.sqlMessage || err.message)
        }

    }

    public getFeedByUser = async (inputIdFriends: string[]): Promise<Post[]> => {

        try {

            const result = await PostDataBase.connection.raw(` SELECT * FROM post_labook WHERE author_id in (${inputIdFriends.map(id => `"${id}"`)})`)
            return result[0].flatMap((elem: any) => postModel(elem))

        } catch (err: any) {
            throw new DataBaseErr(err.sqlMessage || err.message)
        }

    }
}
