import { InvalidId, InvalidToken, MissingInformation } from "../../Common/customError"
import { Request, Response } from "express"
import { IPostBusiness } from "../../Core/business/ports/repository/repositories/repositoriesPostBusiness"
import { createPostInputDTO, getPostInputDTO, getPostOutputDTO, inputCommentPostDTO, inputFeedDTO, inputPostLikeDTO, inputTypeFeedDTO, Post } from "./ports/repository/dtos/dtoPost"



export class PostController {

    /*** está vindo da Business */
    constructor(private iPostBusiness: IPostBusiness) { }

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

            const input: createPostInputDTO = {
                photo,
                description,
                type,
                author_id,
                token
            }

            await this.iPostBusiness.createPost(input)

            res.sendStatus(201)

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

            const inputPostLike: inputPostLikeDTO = {
                idPost,
                token
            }

            await this.iPostBusiness.postLike(inputPostLike)

            res.sendStatus(200)

        } catch (err: any) {
            res.status(400).send(err.message)
        }
    }

    public postUnlike = async (req: Request, res: Response): Promise<void> => {

        try {

            const { idPost } = req.body
            const token: string = req.headers.authorization as string

            if (!idPost) {
                throw new InvalidId
            }

            if (!token) {
                throw new InvalidToken
            }

            const inputPostLike: inputPostLikeDTO = {
                idPost,
                token
            }

            await this.iPostBusiness.postLike(inputPostLike)

            res.sendStatus(200)

        } catch (err: any) {
            res.status(400).send(err.message)
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

            res.sendStatus(201)

        } catch (err: any) {
            res.status(err.statusCode).send(err.message)
        }
    }
}