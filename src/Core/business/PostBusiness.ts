import { Duplicate, GenericError, InvalidToken} from "../../Common/customError"
import { createPostInputDTO, getIdLikeDTO, getPostInputDTO, inputCommentPostDataDTO, inputCommentPostDTO, inputFeedDataDTO, inputFeedDTO, inputPostLikeDataDTO, inputPostLikeDTO, inputTypeFeedDTO, Post } from "./ports/repository/dtos/dtoPost"
import { AuthenticationData } from "./ports/repository/dtos/dtoUser"
import { IPostBusiness, IPostDataBase } from "./ports/repository/repositories/repositoriesPostBusiness"
import { IidGenerator, ITokenManager } from "./ports/repository/repositories/repositoriesServices"
import { IUserDataBase } from "./ports/repository/repositories/repositoriesUserBusiness"


export class PostBusiness implements IPostBusiness{

    constructor(
        private idGenerator: IidGenerator, 
        private tokenManger: ITokenManager,
        private iPostDataBase: IPostDataBase,
        private iUserDataBase: IUserDataBase
        ){}

    public createPost = async (input: createPostInputDTO):Promise<void> => {

        const { photo, description, type, authorId, token } = input

        //middleware de autenticação - do express - apikey - 
        

        const id: string = this.idGenerator.generateId()

        const post: Post = {
            id,
            photo,
            description,
            type,
            createdAt: new Date(),
            authorId,
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
        // regra de negocio da aplicacao

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


    //REFAZER O POST LIKE E FAZER OS TESTES - DARVAS
    public postLike = async (inputPostLike: inputPostLikeDTO):Promise<void> => {

        const { idPost, idUser } = inputPostLike

        if(! idUser){
            throw new InvalidToken
        }

        console.log("entrou business", idPost, idUser)

        //Regra de negocio
        const id: string = this.idGenerator.generateId()

        console.log("gerou id do like", id)

        //o post já foi curtido?
        const isUserLikePost:boolean = await this.iPostDataBase.likePostByUser(idPost, idUser)

        console.log("já curtiu? ", isUserLikePost)

        if(isUserLikePost){
           throw new Duplicate 
        }

        //Input para registro do like na tabela de relacionamento
        const inputPostLikeData: inputPostLikeDataDTO = {
            id,
            idPost,
            idUser
        } 

        return await this.iPostDataBase.postLike(inputPostLikeData) 

    }


    public postUnlike = async (getIdLikePost: string):Promise<void> => {
        
        return await this.iPostDataBase.postUnlike(getIdLikePost)
        
    }

    public createCommentPost = async (inputCommentPost:inputCommentPostDTO):Promise<void> => {
        
        const { comment_post, idPost, token} = inputCommentPost

        const tokenPayloadId: AuthenticationData = await this.tokenManger.getTokenData(token)

        if(!tokenPayloadId.id){
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