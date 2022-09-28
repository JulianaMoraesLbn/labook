import { Duplicate, GenericError, InvalidToken, PostNonexistent } from "../../Common/customError"
import { IPostDataBase} from "../../Infraestruture/ports/repository/repositories/repositoriesPostData"
import { IUserDataBase } from "../../Infraestruture/ports/repository/repositories/repositoriesUserData"
import { createPostInputDTO, getIdLikeDTO, getPostInputDTO, inputCommentPostDataDTO, inputCommentPostDTO, inputFeedDataDTO, inputFeedDTO, inputPostLikeDataDTO, inputPostLikeDTO, inputTypeFeedDTO, Post } from "./ports/repository/dtos/dtoPost"
import { AuthenticationData } from "./ports/repository/dtos/dtoUser"
import { IPostBusiness } from "./ports/repository/repositories/repositoriesPostBusiness"
import { IidGenerator, ITokenManager } from "./ports/repository/repositories/repositoriesServices"


export class PostBusiness implements IPostBusiness{

    constructor(
        private idGenerator: IidGenerator, 
        private tokenManger: ITokenManager,
        /** essas duas interfaces estão vindo do Data... pode? */
        private iPostDataBase: IPostDataBase,
        private iUserDataBase: IUserDataBase
        ){}

    public createPost = async (input: createPostInputDTO):Promise<void> => {

        const { photo, description, type, token } = input

        const tokenPayloadId: AuthenticationData = await this.tokenManger.getTokenData(token)

        const id: string = this.idGenerator.generateId()

        const post: Post = {
            id,
            photo,
            description,
            type,
            createdAt: new Date(),
            author_id: tokenPayloadId.id,
        }

        await this.iPostDataBase.createPost(post)

    }

    public getPostId = async (input: getPostInputDTO):Promise<Post> => {

        const { id } = input

        const post: Post = await this.iPostDataBase.getPostId(id)
        return post
    }

    public feedByUser = async (inputFeed: inputFeedDTO):Promise<Post[]> => {

        const { token, page } = inputFeed

        let size = 5
        let offset = size * (page - 1)

        const tokenPayloadId: AuthenticationData = await this.tokenManger.getTokenData(token)

        if (!tokenPayloadId.id) {
            throw new InvalidToken
        }

        const resultIdFriends: string[] = await this.iUserDataBase.getIdFriends(tokenPayloadId.id)

        const resultPostFriends:Post[] = await this.iPostDataBase.getFeedByUser(resultIdFriends)

        return resultPostFriends
       
    }

    public feedByType = async (inputTypeFeed: inputTypeFeedDTO):Promise<Post[]> => {

        const { typePost, token, page } = inputTypeFeed

        let size = 5
        let offset = size * (page - 1)

        const tokenPayloadId: AuthenticationData = await this.tokenManger.getTokenData(token)

        if (!tokenPayloadId.id) {
            throw new InvalidToken
        }

        const inputFeedData: inputFeedDataDTO = {
            size,
            offset,
            typePost
        }

        const resultPostType:Post[] = await this.iPostDataBase.getPostByType(inputFeedData)

        return resultPostType
    }

    public postLike = async (inputPostLike: inputPostLikeDTO):Promise<void> => {

        const { idPost, token } = inputPostLike

        const tokenPayloadId: AuthenticationData = await this.tokenManger.getTokenData(token)

        const id: string = this.idGenerator.generateId()

        if(! tokenPayloadId.id){
            throw new InvalidToken
        }

        const inputGetIdLikePost: getIdLikeDTO = {
            idPost,
            idUser: tokenPayloadId.id
        } 

        const getIdLikePost = await this.iPostDataBase.getIdLikePost(inputGetIdLikePost)

        if(getIdLikePost.length > 0){
            throw new Duplicate
        }else if(getIdLikePost === undefined || " ") {
            throw new PostNonexistent
        }

        const inputPostLikeData: inputPostLikeDataDTO = {
            id,
            idPost,
            idUser: tokenPayloadId.id
        } 

        return await this.iPostDataBase.postLike(inputPostLikeData) 

    }

    public postUnlike = async (inputPostLike: inputPostLikeDTO):Promise<void> => {

        const { idPost, token } = inputPostLike

        const tokenPayloadId: AuthenticationData = await this.tokenManger.getTokenData(token)

        if(! tokenPayloadId.id){
            throw new InvalidToken
        }

        const inputGetIdLike: getIdLikeDTO = {
            idPost,
            idUser: tokenPayloadId.id
        } 

        const getIdLikePost = await this.iPostDataBase.getIdLikePost(inputGetIdLike)

        if(getIdLikePost.length < 0 || getIdLikePost === undefined){
            throw new GenericError
        }

        return await this.iPostDataBase.postUnlike(getIdLikePost)

    }

    public createCommentPost = async (inputCommentPost:inputCommentPostDTO):Promise<void> => {
        
        const { comment_post, idPost, token} = inputCommentPost

        const tokenPayloadId: AuthenticationData = await this.tokenManger.getTokenData(token)

        if(! tokenPayloadId.id){
            throw new InvalidToken
        }

        const id: string = this.idGenerator.generateId()

        const inputCommentPostData: inputCommentPostDataDTO = {
            id,
            comment_post,
            idUser: tokenPayloadId.id,
            idPost
        }

        await this.iPostDataBase.createCommentPost(inputCommentPostData)
    }
}