import { createPostInputDTO, getIdLikeDTO, getPostInputDTO, inputCommentPostDataDTO, inputCommentPostDTO, inputFeedDataDTO, inputFeedDTO, inputPostLikeDataDTO, inputPostLikeDTO, inputTypeFeedDTO, Post } from "../../entities/Post"
import { AuthenticationData, FriendshipInputDataDTO, FriendshipInputDTO, LoginInputDTO, SignupInputDTO, UnfriendInputDataDTO, UnfriendInputDTO, User } from "../../entities/User"

export interface IidGenerator{
    generateId: () => string
}

export interface ITokenManager{
    generateToken:(id: string)=>string,
    getTokenData:(token: string)=>AuthenticationData
}

export interface IHashManager{
    generateHash:(password: string)=>Promise<string>
    compareHash:(hashNow:string, hashBd: string)=>Promise<boolean>
}

export interface IPostBusiness{
    createPost:(input:createPostInputDTO)=>Promise<void>,
    getPostId:(input: getPostInputDTO)=>Promise<Post>,
    feedByUser:(inputFeed: inputFeedDTO)=>Promise<Post[]>,
    feedByType: (inputTypeFeed: inputTypeFeedDTO)=>Promise<Post[]>,
    postLike:(inputPostLike: inputPostLikeDTO)=>Promise<void>,
    postUnlike:(inputPostLike: inputPostLikeDTO)=>Promise<void>,
    createCommentPost:(inputCommentPost:inputCommentPostDTO)=>Promise<void>
}

export interface IPostDataBase{
    createPost:(post:Post)=>Promise<void>,
    getPostId:(id:string)=>Promise<Post>,
    getPostByType: (inputFeedData: inputFeedDataDTO)=>Promise<Post[]>,
    getIdLikePost:(inputPostLikeData: getIdLikeDTO)=>Promise<string>
    postLike:(inputPostLikeData: inputPostLikeDataDTO)=>Promise<void>,
    postUnlike:(id:string)=>Promise<void>,
    createCommentPost:(inputCommentPostData:inputCommentPostDataDTO)=>Promise<void>,
    getIdFriends: (id:string)=>Promise<string[]>,
    getFeedByUser:(inputIdFriends:string[])=>Promise<Post[]>
}

export interface IUserBuseniss {
    signup:(input: SignupInputDTO)=>Promise<string>,
    login:(input: LoginInputDTO)=>Promise<string>,
    friendship:(input: FriendshipInputDTO)=>Promise<void>,
    unfriend:(input: UnfriendInputDTO)=>Promise<void>
}

export interface IUserDataBase {
    insertUser:(user: User)=>Promise<void>,
    getUserEmail:(email: string)=>Promise<User>,
    getUserId:(id: string)=>Promise<User>,
    newFriendship:(inputFriendData: FriendshipInputDataDTO)=>Promise<void>,
    unfriend:(inputFriendData: UnfriendInputDataDTO)=>Promise<void>,
    getAllFriendsById:(id: string)=>Promise<[]>
}