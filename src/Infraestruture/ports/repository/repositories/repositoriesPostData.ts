import { getIdLikeDTO, inputCommentPostDataDTO, inputFeedDataDTO, inputPostLikeDataDTO, Post } from "../dtos/dtoPost"

/**** DATABASE *****/

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
    likePostByUser:(idPost:string, idUser:string)=>Promise<boolean>
}

