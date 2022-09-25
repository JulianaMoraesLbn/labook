import { Duplicate, GenericError, InvalidToken, PostNonexistent } from "../entities/customError"
import { createPostInputDTO, getIdLikeDTO, getPostInputDTO, inputCommentPostDataDTO, inputCommentPostDTO, inputFeedDataDTO, inputFeedDTO, inputPostLikeDataDTO, inputPostLikeDTO, inputTypeFeedDTO, Post } from "../entities/Post"
import { AuthenticationData } from "../entities/User"
import { IidGenerator, IPostBusiness, IPostDataBase, ITokenManager } from "./ports/services"

export class PostBusiness implements IPostBusiness{

    constructor(
        private idGenerator: IidGenerator, 
        private tokenManger: ITokenManager,
        private iPostDataBase: IPostDataBase
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

        /* const postDataBase = new PostDataBase()
        await postDataBase.createPost(post) */
        await this.iPostDataBase.createPost(post)

    }

    public getPostId = async (input: getPostInputDTO):Promise<Post> => {

        const { id } = input
        /* const post: Post = await new PostDataBase().getPostId(id) */
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

        /* const resultIdFriends: string[] = await new PostDataBase().getIdFriends(tokenPayloadId.id) 
        
        const resultPostFriends: Post[] = await new PostDataBase().getFeedByUser(resultIdFriends)
        */

        const resultIdFriends: string[] = await this.iPostDataBase.getIdFriends(tokenPayloadId.id)

        const resultPostFriends:Post[] = await this.iPostDataBase.getFeedByUser(resultIdFriends)

        return resultPostFriends
       
    }

    public feedByType = async (inputTypeFeed: inputTypeFeedDTO):Promise<Post[]> => {

        const { typePost, token, page } = inputTypeFeed

        let size = 5
        let offset = size * (page - 1)

        const tokenPayloadId: AuthenticationData = await this.tokenManger.getTokenData(token)

        /* const resultFriends = await new UserDataBase().getAllFriendsById(tokenPayloadId.id) */

        if (!tokenPayloadId.id) {
            throw new InvalidToken
        }

        const inputFeedData: inputFeedDataDTO = {
            size,
            offset,
            typePost
        }

        /* const resultPostType:Post[] = await new PostDataBase().getPostByType(inputFeedData) */

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

        /* const getIdLikePost = await new PostDataBase().getIdLikePost(inputGetIdLikePost) */

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
        
       /*  return await new PostDataBase().postLike(inputPostLikeData)  */
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

        /* const getIdLikePost = await new PostDataBase().getIdLikePost(inputGetIdLike) */

        const getIdLikePost = await this.iPostDataBase.getIdLikePost(inputGetIdLike)

        if(getIdLikePost.length < 0 || getIdLikePost === undefined){
            throw new GenericError
        }

        /* return await new PostDataBase().postUnlike(getIdLikePost) */
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

        /* await new PostDataBase().createCommentPost(inputCommentPostData) */
        await this.iPostDataBase.createCommentPost(inputCommentPostData)
    }
}