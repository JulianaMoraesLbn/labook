import { createPostInputDTO, getIdLikeDTO, getPostInputDTO, inputCommentPostDataDTO, inputCommentPostDTO, inputFeedDataDTO, inputFeedDTO, inputPostLikeDataDTO, inputPostLikeDTO, inputTypeFeedDTO, Post } from "../dtos/dtoPost";

export interface IPostBusiness{
    createPost:(input:createPostInputDTO)=>Promise<void>,
    getPostId:(input: getPostInputDTO)=>Promise<Post>,
    feedByUser:(inputFeed: inputFeedDTO)=>Promise<Post[]>,
    feedByType: (inputTypeFeed: inputTypeFeedDTO)=>Promise<Post[]>,
    postLike:(inputPostLike: inputPostLikeDTO)=>Promise<void>,
    postUnlike:(getIdLikePost: string)=>Promise<void>,
    createCommentPost:(inputCommentPost:inputCommentPostDTO)=>Promise<void>
}

export interface IPostDataBase{
    createPost:(post:Post)=>Promise<void>,
    getPostId:(id:string)=>Promise<Post>,
    //receberia tipo e as informacoes de paginacao
    getPostByType: (inputFeedData: inputFeedDataDTO)=>Promise<Post[]>,
    getIdLikePost:(idPost:string, idUser:string)=>Promise<string>,
    postLike:(inputPostLikeData: inputPostLikeDataDTO)=>Promise<void>,
    postUnlike:(id:string)=>Promise<void>,
    createCommentPost:(inputCommentPostData:inputCommentPostDataDTO)=>Promise<void>,
    getFeedByUser:(inputIdFriends:string[])=>Promise<Post[]>
    likePostByUser:(idPost:string, userId:string)=>Promise<boolean>
}