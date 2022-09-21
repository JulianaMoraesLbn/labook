import { InvalidId, InvalidToken, MissingInformation } from "../../Core/entities/customError"
import { Request, Response } from "express"
import { PostBusiness } from "../../Core/business/PostBusiness"
import { createPostInputDTO, getPostInputDTO, getPostOutputDTO, inputComentatioPostDTO, inputFeedDTO, inputPostLikeDTO, inputTypeFeedDTO, Post } from "../../Core/entities/Post"


export class PostController {

    public createPost = async (req: Request, res: Response):Promise<void> => {

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

            const postBusiness = new PostBusiness()
            await postBusiness.createPost(input)

            res.sendStatus(201)

        } catch (err: any) {
            res.status(err.statusCode).send(err.message)
        }
    }

    public getPostId = async (req: Request, res: Response):Promise<void> => {

        try {

            const { id } = req.params

            if (!id) {
                throw new InvalidId
            }

            const input: getPostInputDTO = { id }

            const resultPost: Post = await new PostBusiness().getPostId(input)

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

    public feedByUser = async (req: Request, res: Response):Promise<void> => {

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

            const resultFeed = await new PostBusiness().feedByUser(inputFeed)

            res.status(200).send(resultFeed)

        } catch (err: any) {

            res.status(400).send(err.message)

        }

    }

    public feedByType = async (req: Request, res: Response):Promise<void> => {

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

            const resultFeed = await new PostBusiness().feedByType(inputTypeFeed)

            res.status(200).send(resultFeed)

        } catch (err: any) {

            res.status(err.statusCode).send(err.message)

        }

    }

    public postLike = async (req: Request, res: Response):Promise<void> => {

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

            await new PostBusiness().postLike(inputPostLike)

            res.sendStatus(200)

        } catch (err: any) {
            res.status(400).send(err.message)
        }
    }

    public postUnlike = async (req: Request, res: Response):Promise<void> => {

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

            await new PostBusiness().postUnlike(inputPostLike)

            res.sendStatus(200)

        } catch (err: any) {
            res.status(400).send(err.message)
        }
    }

    public createComentarioPost = async (req: Request, res: Response):Promise<void> => {

        try {
            const { comentario, idPost } = req.body
            const token: string = req.headers.authorization as string

            if (!idPost) {
                throw new InvalidId
            }

            if (!token) {
                throw new InvalidToken
            }

            const inputComentatioPost: inputComentatioPostDTO = {
                comentario,
                idPost,
                token
            }

            await new PostBusiness().createComentarioPost(inputComentatioPost)

            res.sendStatus(201)

        } catch (err: any) {
            res.status(err.statusCode).send(err.message)
        }
    }
}