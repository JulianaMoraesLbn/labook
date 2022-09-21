import { PostDataBase } from "../../Infraestruture/data/PostDataBase"
import { IdGenerator } from "../../Infraestruture/services/generateId"
import { TokenManager } from "../../Infraestruture/services/TokenGenerator"
import { Duplicate, GenericError, InvalidToken, PostNonexistent } from "../entities/customError"
import { createPostInputDTO, getIdLikeDTO, getPostInputDTO, inputComentatioPostDataDTO, inputComentatioPostDTO, inputFeedDataDTO, inputFeedDTO, inputPostLikeDataDTO, inputPostLikeDTO, inputPostUnlikeDataDTO, inputTypeFeedDTO } from "../entities/Post"
import { Post } from "../entities/Post"
import { AuthenticationData } from "../entities/User"

export class PostBusiness {

    public createPost = async (input: createPostInputDTO):Promise<void> => {

        const { photo, description, type, author_id, token } = input

        const tokenManager = new TokenManager()
        const tokenPayloadId: AuthenticationData = await tokenManager.getTokenData(token)

        const idGenerator = new IdGenerator()
        const id: string = idGenerator.generateId()

        const post: Post = {
            id,
            photo,
            description,
            type,
            createdAt: new Date(),
            author_id: tokenPayloadId.id,
        }

        const postDataBase = new PostDataBase()
        await postDataBase.createPost(post)

    }

    public getPostId = async (input: getPostInputDTO):Promise<Post> => {

        const { id } = input
        const post: Post = await new PostDataBase().getPostId(id)
        return post
    }

    public feedByUser = async (inputFeed: inputFeedDTO):Promise<Post[]> => {

        const { token, page } = inputFeed

        let size = 5
        let offset = size * (page - 1)

        const tokenPayloadId = await new TokenManager().getTokenData(token)

        if (!tokenPayloadId.id) {
            throw new InvalidToken
        }

        const resultIdFriends: string[] = await new PostDataBase().getIdFriends(tokenPayloadId.id)

        const resultPostFriends: Post[] = await new PostDataBase().getFeedByUser(resultIdFriends)

        return resultPostFriends
       
    }

    public feedByType = async (inputTypeFeed: inputTypeFeedDTO):Promise<Post[]> => {

        const { typePost, token, page } = inputTypeFeed

        let size = 5
        let offset = size * (page - 1)

        const tokenPayloadId = await new TokenManager().getTokenData(token)

        /* const resultFriends = await new UserDataBase().getAllFriendsById(tokenPayloadId.id) */

        if (!tokenPayloadId.id) {
            throw new InvalidToken
        }

        const inputFeedData: inputFeedDataDTO = {
            size,
            offset,
            typePost
        }

        const resultPostType:Post[] = await new PostDataBase().getPostByType(inputFeedData)

        return resultPostType
    }

    public postLike = async (inputPostLike: inputPostLikeDTO):Promise<void> => {

        const { idPost, token } = inputPostLike

        const tokenPayloadId = await new TokenManager().getTokenData(token)

        const id: string = new IdGenerator().generateId()

        if(! tokenPayloadId.id){
            throw new InvalidToken
        }

        const inputGetIdLikePost: getIdLikeDTO = {
            idPost,
            idUser: tokenPayloadId.id
        } 

        const getIdLikePost = await new PostDataBase().getIdLikePost(inputGetIdLikePost)

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
        
        return await new PostDataBase().postLike(inputPostLikeData) 

    }

    public postUnlike = async (inputPostLike: inputPostLikeDTO):Promise<void> => {

        const { idPost, token } = inputPostLike

        const tokenPayloadId = await new TokenManager().getTokenData(token)

        if(! tokenPayloadId.id){
            throw new InvalidToken
        }

        const inputGetIdLike: getIdLikeDTO = {
            idPost,
            idUser: tokenPayloadId.id
        } 

        const getIdLikePost = await new PostDataBase().getIdLikePost(inputGetIdLike)

        if(getIdLikePost.length < 0 || getIdLikePost === undefined){
            throw new GenericError
        }

        return await new PostDataBase().postUnlike(getIdLikePost)

    }

    public createComentarioPost = async (inputComentatioPost:inputComentatioPostDTO):Promise<void> => {
        
        const { comentario, idPost, token} = inputComentatioPost

        const tokenPayloadId = await new TokenManager().getTokenData(token)

        if(! tokenPayloadId.id){
            throw new InvalidToken
        }

        const id: string = new IdGenerator().generateId()

        const inputComentatioPostData: inputComentatioPostDataDTO = {
            id,
            comentario,
            idUser: tokenPayloadId.id,
            idPost
        }

        await new PostDataBase().createComentarioPost(inputComentatioPostData)
    }
}