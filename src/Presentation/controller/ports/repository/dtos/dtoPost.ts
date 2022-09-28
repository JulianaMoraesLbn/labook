enum POST_TYPES {
    NORMAL = "normal",
    EVENT = "event"
}

export interface createPostInputDTO {
    photo: string,
    description: string,
    type: POST_TYPES,
    author_id: string
    token: string
}

export interface inputFeedDTO {
    token: string,
    page: number
}

export interface inputTypeFeedDTO {
    typePost: POST_TYPES,
    page: number,
    token: string
}

export interface inputPostLikeDTO {
    idPost: string,
    token: string
}

export interface inputCommentPostDTO {
    comment_post: string,
    idPost: string,
    token: string
}

/*** OUTPUT ****/

export type Post = {
    id: string,
    photo: string,
    description: string,
    type: POST_TYPES,
    createdAt: Date,
    author_id: string
}

export interface getPostOutputDTO {
    photo: string,
    description: string,
    type: POST_TYPES,
    createdAt: Date
}

export interface getPostInputDTO {
    id: string
}