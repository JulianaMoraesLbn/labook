import { getIdLikeDTO, inputCommentPostDataDTO, inputFeedDataDTO, inputPostLikeDataDTO, Post } from "../dtos/dtoPost"
import { FriendshipInputDataDTO, UnfriendInputDataDTO, User } from "../dtos/dtoUser"

/**** DATABASE *****/

export interface IPostDataBase{
    createPost:(post:Post)=>Promise<void>,
    getPostId:(id:string)=>Promise<Post>,
    getPostByType: (inputFeedData: inputFeedDataDTO)=>Promise<Post[]>,
    getIdLikePost:(inputPostLikeData: getIdLikeDTO)=>Promise<string>
    postLike:(inputPostLikeData: inputPostLikeDataDTO)=>Promise<void>,
    postUnlike:(id:string)=>Promise<void>,
    createCommentPost:(inputCommentPostData:inputCommentPostDataDTO)=>Promise<void>,
    getFeedByUser:(inputIdFriends:string[])=>Promise<Post[]>
}

