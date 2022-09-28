import { createPostInputDTO, getPostInputDTO, inputCommentPostDTO, inputFeedDTO, inputPostLikeDTO, inputTypeFeedDTO, Post } from "../dtos/dtoPost";

export interface IPostBusiness{
    createPost:(input:createPostInputDTO)=>Promise<void>,
    getPostId:(input: getPostInputDTO)=>Promise<Post>,
    feedByUser:(inputFeed: inputFeedDTO)=>Promise<Post[]>,
    feedByType: (inputTypeFeed: inputTypeFeedDTO)=>Promise<Post[]>,
    postLike:(inputPostLike: inputPostLikeDTO)=>Promise<void>,
    postUnlike:(inputPostLike: inputPostLikeDTO)=>Promise<void>,
    createCommentPost:(inputCommentPost:inputCommentPostDTO)=>Promise<void>
}

