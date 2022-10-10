import { GenericError, InvalidId, InvalidToken, MissingInformation } from "../../Common/customError"
import { Request, Response } from "express"
import { IPostBusiness } from "../../Core/business/ports/repository/repositories/repositoriesPostBusiness"
import { AuthenticationData, createPostInputDTO, getPostInputDTO, getPostOutputDTO, inputCommentPostDTO, inputFeedDTO, inputPostLikeDTO, inputTypeFeedDTO, Post } from "./ports/repository/dtos/dtoPost"
import { ITokenManager } from "./ports/repository/repositories/repositoriesPost.controller"
import { IPostDataBase } from "../../Infraestruture/ports/repository/repositories/repositoriesPostData"




export class PostController {

    constructor(
        //é melhor estar vindo do business ou coloco essa interface no controller?
        private iPostBusiness: IPostBusiness,
        private tokenManger: ITokenManager,
        //este vem do Data - pode? o que seria melhor?
        private iPostDataBase: IPostDataBase,
        ) {}

    public createPost = async (req: Request, res: Response): Promise<void> => {

        try {

            const { photo, description, type, author_id } = req.body
            
            const token: string = req.headers.authorization as string

            if (!photo || !description || !type) {
                throw new MissingInformation
            }

            if (!token) {
                throw new InvalidToken
            }

            const tokenPayloadId: AuthenticationData = await this.tokenManger.getTokenData(token)

            const input: createPostInputDTO = {
                photo,
                description,
                type,
                authorId: tokenPayloadId.id,
                token
            }

            await this.iPostBusiness.createPost(input)

            res.status(201).send("Post criado")

        } catch (err: any) {
            res.status(err.statusCode).send(err.message)
        }
    }

    public getPostId = async (req: Request, res: Response): Promise<void> => {

        try {

            const { id } = req.params

            if (!id) {
                throw new InvalidId
            }

            const input: getPostInputDTO = { id }

            const resultPost: Post = await this.iPostBusiness.getPostId(input)

            const postOutput: getPostOutputDTO = {
                photo: resultPost.photo,
                description: resultPost.description,
                type: resultPost.type,
                createdAt: resultPost.createdAt

            }

            res.status(200).send({ post: postOutput })

        } catch (err: any) {
            res.status(err.statusCode).send(err.message)
        }
    }

    public feedByUser = async (req: Request, res: Response): Promise<void> => {

        try {

            let page = Number(req.query.page)
            const token: string = req.headers.authorization as string

            if (!token) {
                throw new InvalidToken
            }

            if (!page || page <= 0) {
                page = 1
            }

            const inputFeed: inputFeedDTO = {
                token,
                page
            }

            const resultFeed = await this.iPostBusiness.feedByUser(inputFeed)

            res.status(200).send(resultFeed)

        } catch (err: any) {

            res.status(400).send(err.message)

        }

    }

    public feedByType = async (req: Request, res: Response): Promise<void> => {

        try {

            const { typePost } = req.body
            let page = Number(req.query.page)
            const token: string = req.headers.authorization as string


            if (!typePost) {
                throw new MissingInformation
            }

            if (!token) {
                throw new InvalidToken
            }

            if (!page || page <= 0) {
                page = 1
            }

            const inputTypeFeed: inputTypeFeedDTO = {
                typePost,
                token,
                page
            }

            const resultFeed = await this.iPostBusiness.feedByType(inputTypeFeed)

            res.status(200).send(resultFeed)

        } catch (err: any) {

            res.status(err.statusCode).send(err.message)

        }

    }

    public postLike = async (req: Request, res: Response): Promise<void> => {

        try {

            const { idPost } = req.body
            const token: string = req.headers.authorization as string

            if (!idPost) {
                throw new InvalidId
            }

            if (!token) {
                throw new InvalidToken
            }

            const idUser: AuthenticationData = await this.tokenManger.getTokenData(token)

            const inputPostLike: inputPostLikeDTO = {
                idPost,
                idUser: idUser.id
            }

            await this.iPostBusiness.postLike(inputPostLike)

            res.status(200).send("Post curtido com sucesso")

        } catch (err: any) {
            res.status(400).send(err.message)
        }
    }

    public postUnlike = async (req: Request, res: Response): Promise<void> => {

        try {

            // Recebo idPost e Token
            const { idPost } = req.body
            const token: string = req.headers.authorization as string

            if (!idPost) {
                throw new InvalidId
            }

            if (!token) {
                throw new InvalidToken
            }

            //pego id do usuario
            const idUser: AuthenticationData = await this.tokenManger.getTokenData(token)
            console.log(idUser)

            if(!idUser.id || idUser === undefined){
                throw new InvalidToken
            }

            /*  const inputPostLike: inputPostLikeDTO = {
                idPost,
                idUser: idUser.id
            } */

             //pegar o id do like no post
            const getIdLikePost = await this.iPostDataBase.getIdLikePost(idPost, idUser.id)

            if(getIdLikePost.length < 1 || getIdLikePost === undefined){ throw new GenericError}

            //passo o id do like para a business
            await this.iPostBusiness.postUnlike(getIdLikePost)

            res.status(200).send("Post descurtido")

        } catch (err: any) {
            res.status(err.statusCode).send(err.message)
        }
    }

    public createCommentPost = async (req: Request, res: Response): Promise<void> => {

        try {
            const { comment_post, idPost } = req.body
            const token: string = req.headers.authorization as string

            if (!idPost) {
                throw new InvalidId
            }

            if (!token) {
                throw new InvalidToken
            }

            const inputCommentPost: inputCommentPostDTO = {
                comment_post,
                idPost,
                token
            }

            await this.iPostBusiness.createCommentPost(inputCommentPost)

            res.status(201).send("Comentário registrado")

        } catch (err: any) {
            res.status(err.statusCode).send(err.message)
        }
    }
}